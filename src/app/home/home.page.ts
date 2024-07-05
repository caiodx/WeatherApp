import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonThumbnail, IonLabel, IonItem, IonButtons, IonMenuButton, IonMenu, IonButton, IonToast, IonRadioGroup, IonRadio, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonText } from '@ionic/angular/standalone';
import { Platform } from '@ionic/angular';
import { GeoLocationService } from '../services/geoLocation.service';
import { Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';
import { WeatherService } from '../services/weather.service';
import { Router } from '@angular/router';
import { WeatherRoot } from '../model/weater.model';
import { GlobalConfigService } from '../services/global-config.service';
import { ToastService } from '../services/toast.service';
import { LoadingService } from '../services/loading.service';
import { NgIf, NgFor } from '@angular/common';
import { ForeCastRoot } from '../model/forecast.model';

interface FavoriteCity {
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonText, IonCol, IonRow, IonGrid, IonRadio, IonRadioGroup, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonThumbnail, IonLabel, IonItem, IonButtons, IonMenuButton, IonMenu, NgIf, NgFor, IonToast, IonSelect, IonSelectOption ],
})
export class HomePage {

  private geoLocationPosition?: Geoposition = undefined
  public cityName?: string = "Lisbon"
  public countryCode?: string = "PT"
  public weatherConditionCode?: string = "01d"
  public weatherConditionDescription?: string = "Sun"
  public weatherDegrees?: number
  public showError: boolean = false
  public localizacaoSelecionada: string | null = null
  public nomeCidade: string = '';
  public forecastDegrees1?: number
  public forecastDegrees2?: number 
  public forecastDegrees3?: number 
  public forecastConditionDescription1?: string = "Sun"
  public forecastConditionDescription2?: string = "Sun"
  public forecastConditionDescription3?: string = "Sun"
  public forecastDayNumber1? : number
  public forecastDayNumber2? : number
  public forecastDayNumber3? : number
  public forecastConditionCode1?: string = "01d"
  public forecastConditionCode2?: string = "01d"
  public forecastConditionCode3?: string = "01d"
  favoriteCities: FavoriteCity[] = [];

  constructor(private platform: Platform, private geoLocationService: GeoLocationService, private weatherService: WeatherService, private router: Router, private globalConfigService: GlobalConfigService, private toastService: ToastService, private loadingService: LoadingService) {
    this.platform.ready().then(() => {
      console.log("device ready!")
    })
  }

  async ionViewWillEnter() {
    this.LoadSettings()
  }

  async LoadSettings() {

    this.localizacaoSelecionada = this.globalConfigService.getGlobalSetting("localizacaoSelecionada")
    this.nomeCidade = this.globalConfigService.getGlobalSetting("nomeCidade")
    this.LoadFavoriteCities()
    let weather: WeatherRoot
    let forecast: ForeCastRoot
    this.showError = false
    //await this.loadingService.presentLoading()
  
    try {
      if (this.localizacaoSelecionada === "pegarLocalizacaoAtual" || this.localizacaoSelecionada == null || this.localizacaoSelecionada == undefined) {
        this.geoLocationPosition = await this.geoLocationService.GetPosition()
        weather = await this.weatherService.GetWeatherByCoord(this.geoLocationPosition.coords.latitude, this.geoLocationPosition.coords.longitude)
        forecast  = await this.weatherService.GetForeCastByCoord(this.geoLocationPosition.coords.latitude, this.geoLocationPosition.coords.longitude)
      } else {
        weather = await this.weatherService.GetWeatherByCity(this.nomeCidade)
        forecast  = await this.weatherService.GetForeCastByCity(this.nomeCidade)
      }

      this.LoadWeather(weather, forecast)      

    } catch (e: any) {
      this.showError = true
      await this.toastService.showErrorToast(e.message)
    }
    finally{
      //await this.loadingService.dismissLoading()
    }
  }

  LoadWeather(weather: WeatherRoot, foreCast : ForeCastRoot) {
    this.cityName = weather.name
    this.weatherConditionDescription = weather.weather[0]?.description
    this.weatherConditionCode = weather.weather[0]?.icon
    this.countryCode = weather.sys.country
    this.weatherDegrees = Math.floor(weather.main.temp)

    console.log(foreCast.list[0].dt)

    this.forecastDegrees1 = Math.floor(foreCast.list[1].temp.day)
    this.forecastDegrees2 = Math.floor(foreCast.list[2].temp.day)
    this.forecastDegrees3 = Math.floor(foreCast.list[3].temp.day)
    this.forecastConditionCode1 = foreCast.list[1].weather[0].icon
    this.forecastConditionCode2 = foreCast.list[2].weather[0].icon
    this.forecastConditionCode3 = foreCast.list[3].weather[0].icon
    this.forecastConditionDescription1 = foreCast.list[1].weather[0].main
    this.forecastConditionDescription2 = foreCast.list[2].weather[0].main
    this.forecastConditionDescription3 = foreCast.list[3].weather[0].main

    this.forecastDayNumber1 = this.obterDiaDaDataAPI(foreCast.list[1].dt)
    this.forecastDayNumber2 = this.obterDiaDaDataAPI(foreCast.list[2].dt)
    this.forecastDayNumber3 = this.obterDiaDaDataAPI(foreCast.list[3].dt)
  }

  obterDiaDaDataAPI(dataEmSegundos: number): number {
    // Criar um objeto Date a partir do timestamp em segundos
    const data = new Date(dataEmSegundos * 1000);
  
    // Extrair o dia do mês
    const dia = data.getDate();
  
    // Retornar o dia
    return dia;
  }

  async GetGeoPosition() {
    this.geoLocationPosition = await this.geoLocationService.GetPosition()
  }

  GotoPage(route: string) {
    this.router.navigateByUrl(`/${route}`)
  }

  ChangeLocationType(event: CustomEvent) {
    this.localizacaoSelecionada = event.detail.value
    this.saveSettings("localizacaoSelecionada", this.localizacaoSelecionada );
    if (this.localizacaoSelecionada === "pegarLocalizacaoAtual"){
      this.LoadSettings()
    }
    
  }

  saveSettings(nome: string, valor: any){
    this.globalConfigService.saveGlobalSetting(nome, valor)
  }

  ChangeCity(event: CustomEvent) {
    this.nomeCidade = event.detail.value
    this.saveSettings("localizacaoSelecionada", this.localizacaoSelecionada );
    this.saveSettings("nomeCidade", this.nomeCidade );
    this.LoadSettings()
  }

  LoadFavoriteCities(){
    this.favoriteCities = JSON.parse(localStorage.getItem('favoriteCities') || '[]');
  }

}
