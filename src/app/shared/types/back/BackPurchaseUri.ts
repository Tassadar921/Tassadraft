import ApiPurchaseUri from "../api/ApiPurchaseUri";

export default class BackPurchaseUri {

  constructor(purchaseUri: ApiPurchaseUri | void) {
    this.tcgPlayer = purchaseUri?.tcgplayer ?? '';
    this.cardMarket = purchaseUri?.cardmarket ?? '';
  }

  public tcgPlayer: string;
  public cardMarket: string;
}
