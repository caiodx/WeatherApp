import { Injectable } from '@angular/core';
import { WeatherRoot } from '../model/weater.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly API_KEY: string = ''
  private readonly WEATHER_ENDPOINT: string = 'https://api.openweathermap.org/data/2.5/weather'
  private readonly UNITS: string = "metric"

  constructor() {
    this.API_KEY = environment.openweather.apikey
    this.WEATHER_ENDPOINT = environment.openweather.endpoint
  }

  async GetWeatherByCoord(lat: number, lon: number): Promise<WeatherRoot> {
    const url = `${this.WEATHER_ENDPOINT}?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=${this.UNITS}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      return data as WeatherRoot
    } else {
      throw new Error('Falha ao buscar dados do clima.')
    }
  }

  async GetWeatherByCity(cityName: string): Promise<WeatherRoot> {
    const url = `${this.WEATHER_ENDPOINT}?q=${cityName}&appid=${this.API_KEY}&units=${this.UNITS}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      return data as WeatherRoot
    } else {
      if (response.status == 404) {
        throw new Error('Cidade não encontrada.')
      } else
        throw new Error('Falha ao buscar dados do clima.')
    }
  }

}