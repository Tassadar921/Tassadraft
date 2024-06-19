import { Component, OnInit } from '@angular/core';
import { GetCardsNameService } from '../shared/services/get-cards-name/get-cards-name.service';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { UndoService } from '../shared/services/undo/undo.service';
import { LoadingService } from '../shared/services/loading/loading.service';
import Card from '../shared/types/Card';
import CardCollection from '../shared/types/CardCollection';
import PhotoCollection from '../shared/types/PhotoCollection';
import { LocalStorageService } from '../shared/services/localStorage/local-storage.service';
import { RequestService } from '../shared/services/request/request.service';
import ProcessingModeEnum from '../shared/types/ProcessingModeEnum';
import Photo from '../shared/types/Photo';
import BackCard from "../shared/types/back/BackCard";
import { ReportComponent } from "../shared/components/report/report.component";

@Component({
  selector: 'app-tassadraft',
  templateUrl: 'tassadraft.page.html',
  styleUrls: ['tassadraft.page.scss'],
})
export class TassadraftPage implements OnInit {

  public photos: PhotoCollection = new PhotoCollection();
  public cards: CardCollection = new CardCollection(this.undoService);
  public processed: boolean = false;
  public currencySymbol: string = '€';

  constructor(
    private getCardsNameService: GetCardsNameService,
    private actionSheetController: ActionSheetController,
    public undoService: UndoService,
    public loadingService: LoadingService,
    public localStorageService: LocalStorageService,
    public requestService: RequestService,
    private modalController: ModalController,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.updateCurrencySymbol();
  }

  async updateCurrencySymbol(): Promise<void> {
    const currencySymbol: string | null = await this.localStorageService.getItem('currencySymbol');
    if (currencySymbol) {
      this.currencySymbol = currencySymbol;
    }
  }

  public uploadImage(e: Event): void {
    const reader: FileReader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>): void => {
      if (event.target) {
        this.photos.push(Object(event.target).result as string);
      }
    };
    reader.readAsDataURL(Object(e.target).files[0]);
  }

  public getPhoto(path: string): void {
    this.photos.push(path);
  }

  public deletePhoto(index: number): void {
    this.photos.delete(index);
  }

  public async process(): Promise<void> {
    if (await this.localStorageService.getItem('processingMode') === ProcessingModeEnum.local) {
      this.loadingService.startLoading(true);
      this.cards.setCards(await this.getCardsNameService.process(this.photos, this.cards));
    } else if (await this.localStorageService.getItem('processingMode') === ProcessingModeEnum.remote) {
      const backCards: BackCard[] = await this.requestService.remoteProcess(
        await this.getBase64Strings(), this.cards.getCards().length, this.photos.getProcessedPhotos().length
      );
      this.cards.clearCards();
      backCards.map((backCard: BackCard): void => {
        this.cards.add(backCard);
      });
    }
    this.updatedCardDisplayedPrice();
    this.processed = true;
  }

  public async getBase64Strings(): Promise<string[]> {
    const photos: Photo[] = this.photos.getPhotos();

    // Map over photos to create a promise for each photo processing
    const promises: (Promise<string|undefined>[]) = photos.map(async (photo: Photo): Promise<string | undefined> => {
        const response: Response = await fetch(photo.getPath());
        const blob: Blob = await response.blob();

        return new Promise<string>((resolve): void => {
          const reader: FileReader = new FileReader();
          reader.onloadend = (): void => {
            const base64String: string = reader.result as string;
            resolve(base64String);
          };
          reader.readAsDataURL(blob);
        });
    });
    return (await Promise.all(promises)).filter((string): string is string => string !== undefined);
  }

  public updatedCardDisplayedPrice(): void {
    // TODO passer les param de tri en localstorage
    this.cards.sortBy('displayedPrice', true);
  }

  public deleteCard(id: number): void {
    this.cards.deleteById(id);
  }

  public async goBack(): Promise<void> {
    this.processed = false;
  }

  public undo(): void {
    const card: Card = this.undoService.undo();
    if (card) {
      this.cards.push(card);
    }
    this.updatedCardDisplayedPrice();
  }

  public async askDeleteAllConfirmation(): Promise<void> {
    await this.presentSimpleActionSheet('This will delete all your photos', (): void => {
      this.photos.clearPhotos();
    });
  }

  private async presentSimpleActionSheet(header: string, handler: () => void): Promise<void> {
    const actionSheet: HTMLIonActionSheetElement = await this.actionSheetController.create({
      header,
      buttons: [
        {
          text: 'Continue',
          role: 'destructive',
          icon: 'trash',
          handler,
        },
        {
          text: 'Cancel',
          icon: 'close',
        },
      ],
    });
    await actionSheet.present();
  }

  public clearCards(): void {
    this.cards.clearCards();
    this.processed = false;
  }

  public async openReport(): Promise<void> {
    await this.modalController.dismiss();

    const modal: HTMLIonModalElement = await this.modalController.create({
      component: ReportComponent,
      componentProps: {
        projectName: 'Tassadraft',
      },
    });

    await modal.present();
  }
}
