import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-close-button',
  templateUrl: './modal-close-button.component.html',
  styleUrls: ['./modal-close-button.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class ModalCloseButtonComponent {

  constructor(
    public modalController: ModalController
  ) { }
}
