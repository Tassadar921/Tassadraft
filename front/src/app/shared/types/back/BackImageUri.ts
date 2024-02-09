import { ApiImageUri } from '../api/ApiImageUri';

export default class BackImageUri {

  constructor(imageUri: ApiImageUri | void) {
    this.small = imageUri?.small ?? '';
    this.normal = imageUri?.normal ?? '';
    this.large = imageUri?.large ?? '';
    this.png = imageUri?.png ?? '';
    this.artCrop = imageUri?.art_crop ?? '';
  }

  public small: string;
  public normal: string;
  public large: string;
  public png: string;
  public artCrop: string;
};
