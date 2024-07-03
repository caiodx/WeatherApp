import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonThumbnail, IonLabel, IonItem, IonButtons, IonMenuButton, IonMenu, IonButton } from '@ionic/angular/standalone';
import { Platform } from '@ionic/angular';
import { GeoLocationService } from '../services/geoLocation.service';
import { Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';
import { WeatherService } from '../services/weather.service';
import { Router } from '@angular/router';
import { WeatherRoot } from '../model/weater.model';
import { GlobalConfigService } from '../services/global-config.service';
import { ToastService } from '../services/toast.service';
import { LoadingService } from '../services/loading.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonThumbnail, IonLabel, IonItem, IonButtons, IonMenuButton, IonMenu, NgIf ],
})
export class HomePage {

  private geoLocationPosition?: Geoposition = undefined
  public cityName?: string = "Lisbon"
  public countryCode?: string = "PT"
  public weatherConditionCode?: string = "01d"
  public weatherConditionDescription?: string = "Sun"
  public weatherDegrees?: number
  public showError: boolean = false
  


  constructor(private platform: Platform, private geoLocationService: GeoLocationService, private weatherService: WeatherService, private router: Router, private globalConfigService: GlobalConfigService, private toastService: ToastService, private loadingService: LoadingService) {
    this.platform.ready().then(() => {
      console.log("device ready!")
    })
  }

  async ionViewWillEnter() {
    this.LoadSettings()
  }

  async LoadSettings() {

    console.log("1")
    let localizacaoSelecionada = this.globalConfigService.getGlobalSetting("localizacaoSelecionada")
    let nomeCidade = this.globalConfigService.getGlobalSetting("nomeCidade")
    let weather: WeatherRoot
    this.showError = false
    console.log("2")
    //await this.loadingService.presentLoading()
    console.log("3")

    try {
      if (localizacaoSelecionada === "pegarLocalizacaoAtual" || localizacaoSelecionada == null || localizacaoSelecionada == undefined) {
        this.geoLocationPosition = await this.geoLocationService.GetPosition()
        weather = await this.weatherService.GetWeatherByCoord(this.geoLocationPosition.coords.latitude, this.geoLocationPosition.coords.longitude)

      } else {
        weather = await this.weatherService.GetWeatherByCity(nomeCidade)
      }

      this.LoadWeather(weather)

    } catch (e: any) {
      await this.toastService.showErrorToast(e.message)
      this.showError = true
    }
    finally{
      //await this.loadingService.dismissLoading()
    }
  }

  LoadWeather(weather: WeatherRoot) {
    this.cityName = weather.name
    this.weatherConditionDescription = weather.weather[0]?.description
    this.weatherConditionCode = weather.weather[0]?.icon
    this.countryCode = weather.sys.country
    this.weatherDegrees = Math.floor(weather.main.temp)
  }

  async GetGeoPosition() {
    this.geoLocationPosition = await this.geoLocationService.GetPosition()
  }

  GotoPage(route: string) {
    this.router.navigateByUrl(`/${route}`)
  }

}
