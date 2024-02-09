import CardCollection from './CardCollection';
import Card from './Card';

export default class Photo {

  private cards: CardCollection = new CardCollection();

  constructor(
    private id: number,
    private path: string,
    private processed: boolean = false,
  ) { }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getCards(): CardCollection {
    return this.cards;
  }

  public pushCard(card: Card): void {
    this.cards.push(card);
  }

  public deleteCard(name: string): void {
    this.cards.deleteByName(name);
  }

  public decrementId(): void {
    this.id--;
  }

  public getPath(): string {
    return this.path;
  }

  public getProcessed(): boolean {
    return this.processed;
  }

  public setProcessed(): void {
    this.processed = true;
  }

  public clearCards(): void {
    this.cards = new CardCollection();
  }
}
