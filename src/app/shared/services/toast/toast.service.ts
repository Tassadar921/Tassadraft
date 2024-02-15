import { Injectable } from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController: ToastController
  ) {}

  public async displayToast(message: string, position: 'top'|'bottom'|'middle' = 'bottom', color: string = 'success', duration: number = 3000): Promise<void> {
    const toast: HTMLIonToastElement = await this.toastController.create({
      message,
      duration,
      position,
      color,
      cssClass: 'toast',
    });
    await toast.present();
  }
}
