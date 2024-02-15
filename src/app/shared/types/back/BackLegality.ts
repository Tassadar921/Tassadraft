import ApiLegality from "../api/ApiLegality";
export default class BackLegality {
  public constructor(legality: ApiLegality | void) {
    this.standard = legality?.standard ?? '';
    this.pioneer = legality?.pioneer ?? '';
    this.modern = legality?.modern ?? '';
    this.legacy = legality?.legacy ?? '';
    this.pauper = legality?.pauper ?? '';
    this.vintage = legality?.vintage ?? '';
    this.commander = legality?.commander ?? '';
    this.pauperCommander = legality?.paupercommander ?? '';
    this.duel = legality?.duel ?? '';
  }

  public standard: string;
  public pioneer: string;
  public modern: string;
  public legacy: string;
  public pauper: string;
  public vintage: string;
  public commander: string;
  public pauperCommander: string;
  public duel: string;
}
