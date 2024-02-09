import Photo from './Photo';
import Card from './Card';
export default class PhotoCollection {
  constructor(
    private photos: Photo[] = []
  ) { }

  public getPhotos(): Photo[] {
    return this.photos;
  }

  public findByPath(path: string): Photo| undefined {
    return this.photos.find((photo: Photo): boolean => photo.getPath() === path);
  }

  public isCardPresentMultipleTimes(name: string): boolean {
    return this.photos.map((photo: Photo): boolean =>
      photo.getCards().findByName(name) instanceof Card
    ).filter(value => value).length > 1;
  }


  public clearPhotos(): void {
    this.photos = [];
  }

  public push(path: string): void {
    this.photos.push(new Photo(this.photos.length, path));
  }

  public delete(id: number): void {
    this.photos = this.photos.filter((photo: Photo): boolean => photo.getId() !== id);
    this.photos.map((photo: Photo): void => {
      if (photo.getId() > id) {
        photo.decrementId();
      }
    });
  }

  public processed(): void {
    this.photos.map((photo: Photo): void => {
      photo.setProcessed();
    });
  }

  public map(callback: (photo: Photo) => void): void {
    this.photos.map(callback);
  }
}
