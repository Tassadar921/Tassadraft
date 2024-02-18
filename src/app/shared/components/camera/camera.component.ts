import { Component, Output, EventEmitter } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class CameraComponent {

  @Output() public newPhotoEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

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
