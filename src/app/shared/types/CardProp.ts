interface CardProp {
  id: number;
  name: string;
  printedName: string | null;
  layout: string;
  manaCost: string;
  cmc: number;
  typeLine: string;
  printedTypeLine: string | null;
  oracleText: string;
  printedText: string | null;
  colors: string;
  colorIdentity: string;
  collectorNumber: string;
  setName: string;
  rarity: string;
  artist: string;
  language: string;
  displayedPrice: number;
}

export default CardProp;
