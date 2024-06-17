import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './shared/services/localStorage/local-storage.service';
import { RequestService } from './shared/services/request/request.service';
import { CurrencyService } from "./shared/services/currency/currency.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private requestService: RequestService,
    private currencyService: CurrencyService,
  ) {}

  async ngOnInit(): Promise<void> {

    const storedTheme: 'light' | 'dark' | null = <'light' | 'dark' | null>await this.localStorageService.getItem('theme');
    if (storedTheme) {
      document.body.classList.add(storedTheme);
    } else {
      await this.localStorageService.setItem('theme', 'light');
      document.body.classList.add('light');
    }
    if (!await this.localStorageService.getItem('currency')) {
      await this.localStorageService.setItem('currency', 'EUR');
    }
    if (!await this.localStorageService.getItem('processingMode')) {
      await this.localStorageService.setItem('processingMode', 'local');
    }
    try {
      //TODO RETURN TYPE
      const currencies = (await this.requestService.getCurrency())?.rates;
      this.currencyService.setCurrencyList(
        {
          EUR: currencies.EUR,
          USD: currencies.USD,
        });
    } catch (e) {
      console.error(e);
    }
    await this.requestService.updateAuthHeaders();
    if (await this.localStorageService.getItem('sessionToken') && !await this.requestService.checkSessionTokenValidity()) {
      await this.requestService.logout();
    }
  }
}
