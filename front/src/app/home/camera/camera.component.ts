import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent  implements OnInit {

  @Output() newPhotoEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {}

  async takePicture(): Promise<void> {
    const photo: Photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    if(photo.webPath) {
      this.newPhotoEvent.emit(photo.webPath);
    }
  }
}
