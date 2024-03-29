import BackImageUri from "./BackImageUri";
import BackLegality from "./BackLegality";
import BackPrice from "./BackPrice";
import BackRelatedUri from "./BackRelatedUri";
import BackPurchaseUri from "./BackPurchaseUri";
import BackSet from './BackSet';

type BackCard = {
  id: number;
  name: string;
  printedName: string | null;
  layout: string;
  imageUri: BackImageUri;
  manaCost: string;
  cmc: number;
  typeLine: string;
  printedTypeLine: string | null;
  oracleText: string;
  printedText: string | null;
  colors: string;
  colorIdentity: string;
  legality: BackLegality;
  collectorNumber: string;
  setName: string;
  rarity: string;
  artist: string;
  price: BackPrice;
  relatedUri: BackRelatedUri;
  purchaseUri: BackPurchaseUri;
  language: string;
  sets: BackSet[];
  images: number[];
};

export default BackCard;
