import BackImageUri from './back/BackImageUri';
import BackLegality from './back/BackLegality';
import BackRelatedUri from './back/BackRelatedUri';
import BackPrice from './back/BackPrice';
import BackPurchaseUri from './back/BackPurchaseUri';
import BackSet from './back/BackSet';
import ApiCard from './api/ApiCard';
import BackCard from "./back/BackCard";

function isApiCard(card: ApiCard | BackCard): card is ApiCard {
  return (card as ApiCard).collector_number !== undefined;
}

function isBackCard(card: ApiCard | BackCard): card is BackCard {
  return (card as BackCard).collectorNumber !== undefined;
}

export default class Card  {
  constructor(apiCard: ApiCard | BackCard, id: number) {
    const currency: 'usd' | 'eur' = <'usd' | 'eur'>localStorage.getItem('currency') ?? 'usd';
    if (isBackCard(apiCard)) {
      //apiCard is BackCard instance
      this.name = apiCard.name ?? '';
      this.imageUri = apiCard.imageUri;
      this.manaCost = apiCard.manaCost;
      this.typeLine = apiCard.typeLine ?? '';
      this.colors = apiCard.colors;
      this.text = apiCard.text ?? '';
      this.colorIdentity = apiCard.colorIdentity;
      this.legality = apiCard.legality;
      this.collectorNumber = apiCard.collectorNumber;
      this.price = apiCard.price;
      this.relatedUri = apiCard.relatedUri;
      this.purchaseUri = apiCard.purchaseUri;
      this.displayedPrice = apiCard.price.usd ?? 0;
      this.sets = apiCard.sets;
    } else if (isApiCard(apiCard)) {
      //apiCard is ApiCard instance
      this.name = apiCard.printed_name ?? apiCard.name;
      this.imageUri = new BackImageUri(apiCard.image_uris);
      this.manaCost = apiCard.mana_cost;
      this.typeLine = apiCard.printed_type_line ?? apiCard.type_line;
      this.colors = apiCard.colors.join(',');
      this.text = apiCard.printed_text ?? apiCard.oracle_text;
      this.colorIdentity = apiCard.color_identity.join(',');
      this.legality = new BackLegality(apiCard.legalities);
      this.collectorNumber = apiCard.collector_number;
      this.price = new BackPrice(apiCard.prices);
      this.relatedUri = new BackRelatedUri(apiCard.related_uris, apiCard.scryfall_uri);
      this.purchaseUri = new BackPurchaseUri(apiCard.purchase_uris);
      this.displayedPrice = Number(apiCard.prices[currency]) ?? 0;
      this.sets = [];
    } else {
      this.name = '';
      this.imageUri = new BackImageUri();
      this.manaCost = '';
      this.typeLine = '';
      this.colors = '';
      this.text = '';
      this.colorIdentity = '';
      this.legality = new BackLegality();
      this.collectorNumber = '';
      this.price = new BackPrice();
      this.relatedUri = new BackRelatedUri();
      this.purchaseUri = new BackPurchaseUri();
      this.displayedPrice = 0;
      this.sets = [];
    }
    this.id = id;
    this.layout = apiCard.layout;
    this.cmc = apiCard.cmc;
    this.rarity = apiCard.rarity;
    this.artist = apiCard.artist;
  }

  public id: number;
  public readonly name: string;
  public readonly layout: string;
  public readonly imageUri: BackImageUri;
  public readonly manaCost: string;
  public readonly cmc: number;
  public readonly typeLine: string;
  public readonly text: string;
  public readonly colors: string;
  public readonly colorIdentity: string;
  public readonly legality: BackLegality;
  public readonly sets: BackSet[];
  public readonly collectorNumber: string;
  public readonly rarity: string;
  public readonly artist: string;
  public readonly price: BackPrice;
  public readonly relatedUri: BackRelatedUri;
  public readonly purchaseUri: BackPurchaseUri;
  public displayedPrice: number;

  public getFoiledEdited(): boolean {
    return !!(this.price.eurFoil || this.price.usdFoil);
  }

  public isToggleFoilActive(): boolean {
    return this.displayedPrice === this.price.eurFoil || this.displayedPrice === this.price.usdFoil;
  }

  public toggleDisplayedPrice(): void {
    this.displayedPrice = this.displayedPrice === this.price.usd ? this.price.usdFoil : this.price.usd;
  }

  public addSet(set: BackSet): void {
    this.sets.push(set);
  }
}
