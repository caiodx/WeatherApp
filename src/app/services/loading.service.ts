import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loadingController: LoadingController) { }

  // Métodos para mostrar e ocultar o carregador
  async presentLoading(message: string = 'Carregando...') {
    const loading = await this.loadingController.create({
      message: message,
      duration: 0
    });
    await loading.present();
  }

  async dismissLoading() {
    await this.loadingController.dismiss();
  }
}