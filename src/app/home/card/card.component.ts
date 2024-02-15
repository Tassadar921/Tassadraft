import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Card from '../../shared/types/Card';
import { CurrencyService } from "../../shared/services/currency/currency.service";
import { LocalStorageService } from "../../shared/services/localStorage/local-storage.service";
import { ModalController } from '@ionic/angular';
import { PreviewComponent } from "./preview/preview.component";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {

  @Input() card: Card | undefined;
  @Output() deleteCardEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() updatedPriceEvent: EventEmitter<void> = new EventEmitter<void>();
  public foilCard: boolean = false;
  public currencySymbol: '€' | '$' | '£' = '$';
  public cardPrice: number = 0;
  private buttonClicked: boolean = false;

  constructor(
    public currencyService: CurrencyService,
    public localStorageService: LocalStorageService,
    private modalController: ModalController,
  ) { }

  async ngOnInit(): Promise<void> {
    this.foilCard = this.card?.isToggleFoilActive() ?? false;
    await this.updateCardPrice();
    this.currencyService.event.subscribe((): void => {
      this.updateCardPrice();
    })
  }

  public deleteCard(id: number | undefined): void {
    if (id !== undefined) {
      this.buttonClicked = true;
      this.deleteCardEvent.emit(id);
    }
  }

  public async togglePrice(): Promise<void> {
    if (this.card) {
      this.buttonClicked = true;
      this.card.toggleDisplayedPrice();
      await this.updateCardPrice();
      this.updatedPriceEvent.emit();
    }
  }

  public async updateCardPrice(): Promise<void> {
    if (this.card) {
      this.cardPrice = this.currencyService.convertToCurrency(this.card.displayedPrice, <'EUR' | 'USD' | 'GBP'>await this.localStorageService.getItem('currency'));
      this.currencySymbol = this.currencyService.getSymbol(<'EUR' | 'USD' | 'GBP'>await this.localStorageService.getItem('currency'));
    }
  }

  public previewCard(): void {
    if (!this.buttonClicked) {
      this.modalController.create({
        component: PreviewComponent,
        componentProps: {
          card: this.card,
        }
      }).then(async (modal: HTMLIonModalElement): Promise<void> => {
        await modal.present();
      });
    } else {
      this.buttonClicked = false;
    }
  }

}
