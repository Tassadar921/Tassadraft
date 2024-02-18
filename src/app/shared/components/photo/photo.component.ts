import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import Photo from '../../types/Photo';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgIf
  ]
})
export class PhotoComponent {

  @Input() public photo: Photo | undefined;
  @Output() public deletePhotoEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private modalController: ModalController
  ) {}

  public async deletePhoto(fromModal: boolean = false): Promise<void> {
    if (fromModal) {
      await this.modalController.dismiss();
    }
    this.deletePhotoEvent.emit(this.photo?.getId());
  }
}
