import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {

  public event: EventEmitter<void> = new EventEmitter<void>();

  private currencyList: { EUR: { value: number, symbol: '€' }, USD: { value: number, symbol: '$' } } = {
    EUR: { value: 1, symbol: '€' },
    USD: { value: 1.2, symbol: '$' },
  };

  constructor() { }

  public getCurrencyList(): { EUR: { value: number, symbol: '€' }, USD: { value: number, symbol: '$' } } {
    return this.currencyList;
  }

  public setCurrencyList(currencies: { EUR: number, USD: number}): void {
    for (const currency in this.currencyList) {
      // @ts-ignore
      this.currencyList[currency].value = currencies[currency];
    }
  }

  public convertToCurrency(value: number, currency: 'EUR' | 'USD'): number {
    return Math.floor(value * this.currencyList[currency].value*100)/100;
  }

  public getSymbol(currency: 'EUR' | 'USD'): '€' | '$' {
    return this.currencyList[currency].symbol;
  }

  public selectedCurrencyChanged(): void {
    this.event.emit();
  }
}
