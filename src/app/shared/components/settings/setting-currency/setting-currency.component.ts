import {Component, EventEmitter, Output} from '@angular/core';
import { CurrencyService } from "../../../services/currency/currency.service";
import { LocalStorageService } from "../../../services/localStorage/local-storage.service";

@Component({
  selector: 'app-setting-currency',
  templateUrl: './setting-currency.component.html',
  styleUrls: ['../settings.component.scss'],
})
export class SettingCurrencyComponent {

  public readonly Object: ObjectConstructor = Object;
  public selectedCurrency: string = 'USD';
  @Output() public currencyChanged: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    public currencyService: CurrencyService,
    private localStorageService: LocalStorageService,
  ) {
    this.localStorageService.getItem('currency').then((currency: string | null): void => {
      //TODO CURRENCY ENUM
      this.selectedCurrency = currency ?? 'USD';
    });
  }

  public async newCurrencySelected(): Promise<void> {
    await this.localStorageService.setItem('currency', this.selectedCurrency);
    this.currencyService.selectedCurrencyChanged();
    this.currencyChanged.emit();
  }
}
