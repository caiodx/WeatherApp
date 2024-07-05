import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonNav, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonButton, IonList, IonListHeader, IonItem, IonGrid, IonRow, IonCol, IonLabel, IonText } from '@ionic/angular/standalone';
import { NgIf, NgFor } from '@angular/common';
import { GlobalConfigService } from 'src/app/services/global-config.service';
interface FavoriteCity {
  name: string;
}

@Component({
  selector: 'app-favorite-cities',
  templateUrl: './favorite-cities.component.html',
  styleUrls: ['./favorite-cities.component.css'],
  imports: [IonText, IonLabel, IonContent, IonHeader, IonNav, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonInput, IonButton, IonList, IonListHeader, IonItem, NgIf, NgFor, IonGrid, IonRow, IonCol],
  standalone: true,
})
export class FavoriteCitiesComponent implements OnInit {
  favoriteCities: FavoriteCity[] = [];
  newCityName: string = '';

  constructor(private globalConfigService: GlobalConfigService) { }

  ngOnInit(): void {
    // Carregar cidades favoritas do armazenamento local
    // Exemplo:
    this.favoriteCities = JSON.parse(localStorage.getItem('favoriteCities') || '[]');
  }

  addCity() {
    if (this.newCityName) {
      // Verificar se a cidade já existe
      const existingCity = this.favoriteCities.find(city => city.name.toLowerCase() === this.newCityName.toLowerCase())
  
      if (!existingCity) {
        this.favoriteCities.push({ name: this.newCityName })
        this.newCityName = ''
  
        // Salvar cidades favoritas no armazenamento local
        // ...
      } else {
        // Exibir mensagem de erro (cidade já existente)
        console.error('Cidade já existe na lista!');
      }

      this.newCityName = ''
    }

    this.RefreshList()

  }

  selectCity(city: FavoriteCity) {
    // Implementar a lógica para selecionar a cidade
    console.log('Cidade selecionada:', city.name);
  }

  removeCity(city: FavoriteCity) {
    this.favoriteCities = this.favoriteCities.filter(c => c !== city)
    this.RefreshList()
  }

  ChangeCityNameEvent(event: CustomEvent) {

    this.newCityName = event.detail.value
  }

  RefreshList(){
    this.globalConfigService.saveGlobalSetting("favoriteCities", this.favoriteCities)
  }
}