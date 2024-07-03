import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async showSuccessToast(message: string, duration?: number) {
    const toast = await this.toastController.create({
      message: message,
      color: 'success',
      duration: duration || 2000,
      position: "top"
    });
    await toast.present();
  }

  async showErrorToast(message: string, duration?: number) {
    const toast = await this.toastController.create({
      message: message,
      color: 'danger',
      duration: duration || 2000,
      position: "top"
    });
    await toast.present();
  }

  async showWarningToast(message: string, duration?: number) {
    const toast = await this.toastController.create({
      message: message,
      color: 'warning',
      duration: duration || 2000,
      position: "top"
    });
    await toast.present();
  }
}