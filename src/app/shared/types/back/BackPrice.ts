import ApiPrice from "../api/ApiPrice";

export default class BackPrice {
  constructor(apiPrice: ApiPrice | void) {
    this.usd = Number(apiPrice?.usd) ?? 0;
    this.usdFoil = Number(apiPrice?.usd_foil) ?? 0;
    this.eur = Number(apiPrice?.eur) ?? 0;
    this.eurFoil = Number(apiPrice?.eur_foil) ?? 0;
    this.gbp = 0;
    this.gbpFoil = 0;
  }

  public usd: number;
  public usdFoil: number;
  public eur: number;
  public eurFoil: number;
  public gbp: number;
  public gbpFoil: number;
}
