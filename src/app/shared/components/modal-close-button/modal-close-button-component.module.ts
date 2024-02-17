import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCloseButtonComponent } from "./modal-close-button.component";
import { IonicModule } from "@ionic/angular";


@NgModule({
  exports: [ModalCloseButtonComponent],
  declarations: [ModalCloseButtonComponent],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class ModalCloseButtonComponentModule { }
