import ApiRelatedUri from '../api/ApiRelatedUri';

export default class BackRelatedUri {
  constructor(relatedUri: ApiRelatedUri | void, scryfallUri: string = '') {
    this.gatherer = relatedUri?.gatherer ?? '';
    this.edhrec = relatedUri?.edhrec ?? '';
    this.scryfall = scryfallUri;
  }

  public gatherer: string;
  public edhrec: string;
  public scryfall: string;
}
