import { Injectable } from '@angular/core';
import Tesseract from 'tesseract.js';
// needed by tesseract
import Buffer from 'sharp';
import levenshtein from 'js-levenshtein';
import { LoadingService } from '../loading/loading.service';
import Card from '../../types/Card';
import CardCollection from '../../types/CardCollection';
import Photo from '../../types/Photo';
import PhotoCollection from '../../types/PhotoCollection';
import { RequestService } from '../request/request.service';
import { ApiCard } from "../../types/api/ApiCard";
import BackSet from '../../types/back/BackSet';

@Injectable({
  providedIn: 'root'
})
export class GetCardsNameService {

  private wordsDataBase: string[] = [];
  private cardNamesDataBase: string[] = [];

  constructor(
    private requestService: RequestService,
    private loadingService: LoadingService,
  ) {}

  public getWordsDataBase(): string[] {
    return this.wordsDataBase;
  }

  public getCardNamesDataBase(): string[] {
    return this.cardNamesDataBase;
  }

  public async setWordsDataBase(): Promise<void> {
    this.wordsDataBase = await this.requestService.getWordsDataBase();
  }

  public async setCardNamesDataBase(): Promise<void> {
    this.cardNamesDataBase = await this.requestService.getCardNamesDataBase();
  }

  private async main(imagePath: string): Promise<string[] | void> {
    const response: Response = await fetch(imagePath);
    const blob: Blob = await response.blob();

    const arrayBuffer: ArrayBuffer = await new Promise<ArrayBuffer>((resolve, reject): void => {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any): void => {
        resolve(e.target.result);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    });
    const blob1: Blob = new Blob([arrayBuffer]);

    const objectURL: string = URL.createObjectURL(blob1);
    const data: { data: { text: string } } = await Tesseract.recognize(objectURL, 'eng', {
      logger: (info) => this.loadingService.currentPercentage = Math.round(info.progress * 10000)/100,
    });

    return await this.extractMTGCardNames(data.data.text);
  }

  private async deepSearch(previousWord: string, currentWord: string): Promise<string> {
    let returnedData: string[] = [];
    if (previousWord && currentWord) {
      try {
        for (const cardName of this.cardNamesDataBase) {
          if (cardName.toLowerCase().includes(previousWord.toLowerCase()) && cardName.toLowerCase().includes(currentWord.toLowerCase())) {
            returnedData.push(cardName)
          }
        }
        let minDistance: number = Infinity;
        let closestCardName: string = '';
        returnedData.map((cardName: string): void => {
          const distance = levenshtein(`${previousWord} ${currentWord}`.toLowerCase(), cardName.toLowerCase());

          if (distance < minDistance) {
            closestCardName = cardName;
            minDistance = distance;
          }
        });

        let card: any;
        if(closestCardName) {
          try {
            card = await this.requestService.getCardData(closestCardName);
          } catch (e) {
            console.log(e);
          }
        }

        return card ? card.name && card.layout !== 'token' && card.games.includes('paper') ? card.name : '' : '';
      } catch (e) {
        console.log(e);
        return '';
      }
    } else {
      // a word is missing : extremity word
      return '';
    }
  }

  private async extractMTGCardNames(text: any): Promise<string[]> {
    const minLength: 3 = 3;
    if (typeof text === 'string') {
      text = text.replace(/(\r\n|\n|\r)/gm, ' ');
      text = text.replace(/ +(?= )/g, '');
      text = text.replace(/[^a-zA-Z0-9 ]/g, 'a');
      text = text.split(' ').reduce((acc: string, cur: string): string => {
        if (cur.length > minLength) {
          return acc + ' ' + cur;
        }
        return acc;
      }).split(' ').map((word: string): string[] | undefined | void => {
        let minDistance: number = Infinity;
        let closestWords: string[] = [];

        for (const databaseWord of this.wordsDataBase) {
          const distance = levenshtein(word.toLowerCase(), databaseWord.toLowerCase());

          if (distance < minDistance) {
            closestWords = [databaseWord];
            minDistance = distance;
          } else if (distance === minDistance) {
            closestWords.push(databaseWord);
          }
        }

        if (closestWords.length < 5 && minDistance < 2) {
          return closestWords;
        }
      }).filter((word: string): string => word);
    }
    let cardNames: string[] = [];

    for (let i = 1; i < text.length - 1; i++) {
      const currentSubArray: string[] = text[i];
      const previousSubArray: string = text[i - 1];

      for (let j = 0; j < currentSubArray.length; j++) {
        const currentWord: string = currentSubArray[j];

        for (let k = 0; k < previousSubArray.length; k++) {
          const previousWord: string = previousSubArray[k];

          let returnedData: string = await this.deepSearch(currentWord, previousWord);

          returnedData = returnedData.split(' ').map((word: string): string => word.length > 3 ? word : '').join(' ');

          if (returnedData && levenshtein(`${previousWord.toLowerCase()} ${currentWord}`.toLowerCase(), returnedData.toLowerCase()) < 2 && !cardNames.includes(returnedData)) {
            cardNames.push(returnedData);
          }
        }
      }
    }
    return cardNames;
  }

  public async process(photos: PhotoCollection, recognizedCards: CardCollection): Promise<Card[]> {
    if (!this.wordsDataBase.length) {
      await this.setWordsDataBase();
    }
    if (!this.cardNamesDataBase.length) {
      await this.setCardNamesDataBase();
    }
    this.loadingService.setTotalItems(photos.getPhotos().length);

    const pushedCardNames: Set<string> = new Set<string>();
    const cards: Card[] = [];

    // Process recognized cards asynchronously
    recognizedCards.getCards().map(async (card: Card): Promise<void> => {
      cards.push(card);
      pushedCardNames.add(card.name);
    });

    // Process photos and fetch card data concurrently
    await Promise.all(photos.getPhotos().map(async (photo: Photo) => {
      //early return if photo already processed
      if (photo.getProcessed()) {
        return [];
      }

      const recognizedCardsNames: void | string[] = await this.main(photo.getPath());

      //early return if no recognized cards
      if (!recognizedCardsNames) {
        return [];
      }

      for (const cardName of recognizedCardsNames) {
        try {
          const apiCard: ApiCard | undefined = await this.requestService.getCardData(cardName);
          if (apiCard && apiCard.layout !== 'token') {
            const card: Card = new Card(apiCard, cards.length);
            card.addSet(new BackSet(await this.requestService.getSetData(apiCard.set)));
            photo.pushCard(card);
            if(!pushedCardNames.has(apiCard.name)) {
              cards.push(card);
              pushedCardNames.add(apiCard.name);
            }
          }
        } catch (e) {
          console.error(e);
        }
      }

      return recognizedCardsNames;
    }));

    return cards;
  }

}
