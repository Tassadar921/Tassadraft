import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loading: boolean = false;
  public cardsProcessing: boolean = false;
  public currentItem: number = 0;
  private totalItems: number = 0;
  public currentPercentage: number = 0;

  constructor() { }

  public startLoading(cardsProcessing: boolean = false): void {
    this.loading = true;
    this.currentItem = 1;
    this.currentPercentage = 0;
    this.cardsProcessing = cardsProcessing;
  }

  public setTotalItems(totalItems: number): void {
    this.totalItems = totalItems;
  }

  public getTotalItems(): number {
    return this.totalItems;
  }

  public stopLoading(): void {
    this.loading = false;
    this.currentItem = 0;
    this.currentPercentage = 0;
    this.cardsProcessing = false;
  }
}
