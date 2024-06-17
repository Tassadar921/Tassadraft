import BackImageUri from "./BackImageUri";
import BackLegality from "./BackLegality";
import BackPrice from "./BackPrice";
import BackRelatedUri from "./BackRelatedUri";
import BackPurchaseUri from "./BackPurchaseUri";
import BackSet from './BackSet';

type BackCard = {
  name: string;
  layout: string;
  imageUri: BackImageUri;
  manaCost: string;
  cmc: number;
  typeLine?: string;
  text?: string;
  colors: string;
  colorIdentity: string;
  legality: BackLegality;
  sets: BackSet[];
  collectorNumber: string;
  rarity: string;
  artist: string;
  price: BackPrice;
  relatedUri: BackRelatedUri;
  purchaseUri: BackPurchaseUri;
  images: number[];
};

export default BackCard;
