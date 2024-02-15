import { ApiSet } from '../api/ApiSet';

export default class BackSet {
  public constructor(legality: ApiSet | void) {
    this.name = legality?.name ?? '';
    this.code = legality?.code ?? '';
    this.releaseDate = legality?.released_at ?? '';
    this.type = legality?.set_type ?? '';
    this.cardCount = legality?.card_count ?? 0;
    this.iconSvgUri = legality?.icon_svg_uri ?? '';
  }

  public name: string;
  public code: string;
  public releaseDate: string;
  public type: string;
  public cardCount: number;
  public iconSvgUri: string;
}
