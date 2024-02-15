import BackImageUri from './back/BackImageUri';
import BackLegality from './back/BackLegality';
import BackRelatedUri from './back/BackRelatedUri';
import BackPrice from './back/BackPrice';
import BackPurchaseUri from './back/BackPurchaseUri';
import BackSet from './back/BackSet';
import { ApiCard } from './api/ApiCard';
import { BackCard } from "./back/BackCard";

function isApiCard(card: any): card is ApiCard {
  return (card as ApiCard).collector_number !== undefined;
}

function isBackCard(card: any): card is BackCard {
  return (card as BackCard).collectorNumber !== undefined;
}

export default class Card  {
  constructor(apiCard: ApiCard | BackCard, id: number) {
    if (isBackCard(apiCard)) {
      //apiCard is BackCard instance
      this.printedName = apiCard.printedName ?? null;
      this.imageUri = apiCard.imageUri;
      this.manaCost = apiCard.manaCost;
      this.typeLine = apiCard.typeLine;
      this.printedTypeLine = apiCard.printedTypeLine ?? null;
      this.colors = apiCard.colors;
      this.oracleText = apiCard.oracleText;
      this.printedText = apiCard.printedText ?? null;
      this.colorIdentity = apiCard.colorIdentity;
      this.legality = apiCard.legality;
      this.collectorNumber = apiCard.collectorNumber;
      this.setName = apiCard.setName;
      this.price = apiCard.price;
      this.relatedUri = apiCard.relatedUri;
      this.purchaseUri = apiCard.purchaseUri;
      this.language = apiCard.language;
      this.displayedPrice = apiCard.price.usd ?? 0;
      this.sets = apiCard.sets;
    } else if (isApiCard(apiCard)) {
      //apiCard is ApiCard instance
      this.printedName = apiCard.printed_name ?? null;
      this.imageUri = new BackImageUri(apiCard.image_uris);
      this.manaCost = apiCard.mana_cost;
      this.typeLine = apiCard.type_line;
      this.printedTypeLine = apiCard.printed_type_line ?? null;
      this.colors = apiCard.colors.join(',');
      this.oracleText = apiCard.oracle_text;
      this.printedText = apiCard.printed_text ?? null;
      this.colorIdentity = apiCard.color_identity.join(',');
      this.legality = new BackLegality(apiCard.legalities);
      this.collectorNumber = apiCard.collector_number;
      this.setName = apiCard.set_name;
      this.price = new BackPrice(apiCard.prices);
      this.relatedUri = new BackRelatedUri(apiCard.related_uris, apiCard.scryfall_uri);
      this.purchaseUri = new BackPurchaseUri(apiCard.purchase_uris);
      this.language = apiCard.lang;
      this.displayedPrice = Number(apiCard.prices.usd) ?? 0;
      this.sets = [];
    } else {
      this.printedName = '';
      this.imageUri = new BackImageUri();
      this.manaCost = '';
      this.typeLine = '';
      this.printedTypeLine = null;
      this.colors = '';
      this.oracleText = '';
      this.printedText = null;
      this.colorIdentity = '';
      this.legality = new BackLegality();
      this.collectorNumber = '';
      this.setName = '';
      this.price = new BackPrice();
      this.relatedUri = new BackRelatedUri();
      this.purchaseUri = new BackPurchaseUri();
      this.language = '';
      this.displayedPrice = 0;
      this.sets = [];
    }
    this.name = apiCard.name;
    this.layout = apiCard.layout;
    this.cmc = apiCard.cmc;
    this.rarity = apiCard.rarity;
    this.artist = apiCard.artist;
    this.id = id;
  }

  public id: number;
  public readonly name: string;
  public readonly printedName: string | null;
  public readonly layout: string;
  public readonly imageUri: BackImageUri;
  public readonly manaCost: string;
  public readonly cmc: number;
  public readonly typeLine: string;
  public readonly printedTypeLine: string | null;
  public readonly oracleText: string;
  public readonly printedText: string | null;
  public readonly colors: string;
  public readonly colorIdentity: string;
  public readonly legality: BackLegality;
  public readonly sets: BackSet[];
  public readonly collectorNumber: string;
  public readonly setName: string;
  public readonly rarity: string;
  public readonly artist: string;
  public readonly price: BackPrice;
  public readonly relatedUri: BackRelatedUri;
  public readonly purchaseUri: BackPurchaseUri;
  public readonly language: string;
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
