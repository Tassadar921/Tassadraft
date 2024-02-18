import { Component, Input } from '@angular/core';
import Card from "../../types/Card";
import { NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalCloseButtonComponent } from '../modal-close-button/modal-close-button.component';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    IonicModule,
    ModalCloseButtonComponent
  ],
})
export class PreviewComponent {

  @Input() public card: Card | undefined;

  constructor() { }
}
