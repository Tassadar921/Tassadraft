import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Card from '../../types/Card';
import { CurrencyService } from "../../services/currency/currency.service";
import { LocalStorageService } from "../../services/localStorage/local-storage.service";
import { IonicModule, ModalController } from '@ionic/angular';
import { PreviewComponent } from "../preview/preview.component";
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgIf,
    FormsModule
  ]
})
export class CardComponent  implements OnInit {

  @Input() public card: Card | undefined;
  @Output() public deleteCardEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() public updatedPriceEvent: EventEmitter<void> = new EventEmitter<void>();
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
      this.cardPrice = this.currencyService.convertToCurrency(this.card.displayedPrice, <'EUR' | 'USD'>await this.localStorageService.getItem('currency'));
      this.currencySymbol = this.currencyService.getSymbol(<'EUR' | 'USD'>await this.localStorageService.getItem('currency'));
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
