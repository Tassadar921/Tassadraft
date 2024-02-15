import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Photo from '../../shared/types/Photo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent implements OnInit {

  @Input() public photo: Photo | undefined;
  @Output() public deletePhotoEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private modalController: ModalController
  ) {}

  ngOnInit(): void { }

  public async deletePhoto(fromModal: boolean = false): Promise<void> {
    if (fromModal) {
      await this.modalController.dismiss();
    }
    this.deletePhotoEvent.emit(this.photo?.getId());
  }
}
