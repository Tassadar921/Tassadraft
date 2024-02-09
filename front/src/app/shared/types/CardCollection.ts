import Card from './Card';
import { UndoService } from '../services/undo/undo.service';
import { BackCard } from './back/BackCard';
import CardProp from "./CardProp";

export default class CardCollection {

  public sortedBy: { category: string, direction: 'DESC' | 'ASC' } = {
    category: 'displayedPrice',
    direction: 'DESC',
  };

  constructor(
    private undoService: UndoService = new UndoService(),
    private cards: Card[] = [],
  ) {}

  public getCards(): Card[] {
    return this.cards;
  }

  public findBy<P extends keyof Card>(prop: P, value: Card[P]): Card | undefined {
    return this.cards.find(card => card[prop] === value);
  }

  public findByName(name: string): Card | undefined {
    return this.cards.find((card: Card): boolean => card.name === name);
  }

  public setCards(cards: Card[]): void {
    this.cards = cards;
  }

  public push(card: Card): void {
    this.cards.push(card);
  }

  public add(backCard: BackCard): Card {
    const card: Card = new Card(backCard, this.cards.length);
    if(!this.cards.find((c: Card): boolean => c.name === backCard.name)) {
      this.cards.push(card);
    }
    return card;
  }

  public deleteById(id: number): void {
    this.undoService.add(this.cards[id]);
    this.cards.splice(id, 1);
    this.cards.map((card: Card): void => {
      if (card.id > id) {
        card.id--;
      }
    });
  }

  public deleteByName(name: string): void {
    const id = this.cards.findIndex((card: Card): boolean => card.name === name);
    this.cards.splice(id, 1);
    this.cards.map((card: Card): void => {
      if (card.id > id) {
        card.id--;
      }
    });
  }

  public forEach(callback: (card: Card) => void): void {
    this.cards.forEach(callback);
  }

  public sortBy(category: string, init: boolean = false): void {
    switch(category) {
      case 'displayedPrice':
        if (this.sortedBy.category === 'displayedPrice') {
          if (this.sortedBy.direction === 'ASC' || init) {
            this.cards.sort((card1: Card, card2: Card) => card2.displayedPrice - card1.displayedPrice);
            this.sortedBy.direction = 'DESC';
          } else {
            this.cards.sort((card1: Card, card2: Card) => card1.displayedPrice - card2.displayedPrice);
            this.sortedBy.direction = 'ASC';
          }
        } else {
          this.cards.sort((card1: Card, card2: Card) => card2.displayedPrice - card1.displayedPrice);
          this.sortedBy = {
            category: 'displayedPrice',
            direction: 'DESC',
          };
        }
        break;
      case 'name':
        if (this.sortedBy.category === 'name') {
          //TODO optimize
          if (this.sortedBy.direction === 'ASC') {
            this.cards.sort((card1: Card, card2: Card) => card1.name.localeCompare(card2.name));
            this.sortedBy.direction = 'DESC';
          } else {
            this.cards.sort((card1: Card, card2: Card) => card2.name.localeCompare(card1.name));
            this.sortedBy.direction = 'ASC';
          }
        } else {
          this.cards.sort((card1: Card, card2: Card) => card1.name.localeCompare(card2.name));
          this.sortedBy = {
            category: 'name',
            direction: 'DESC',
          };
        }
        break;
    }
    for(let i = 0; i < this.cards.length; i++) {
      this.cards[i].id = i;
    }
  }

  public splice(index: number, howMany: number = 1): void {
    this.cards.splice(index, howMany);
  }

  public clearCards(): void {
    this.cards = [];
  }
}
