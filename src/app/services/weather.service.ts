import { Injectable } from '@angular/core';
import { WeatherRoot } from '../model/weater.model';
import { environment } from '../../environments/environment';
import { ForeCastRoot } from '../model/forecast.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly WEATHER_ENDPOINT: string = ''

  constructor() {
    this.WEATHER_ENDPOINT = environment.openweather.endpoint
  }

  async GetWeatherByCoord(lat: number, lon: number): Promise<WeatherRoot> {
    const url = `${this.WEATHER_ENDPOINT}/coord?lat=${lat}&lon=${lon}`   
    const response = await this.executaFetch(url, 'GET')
    if (response.ok) {
      const data = await response.json()
      return data as WeatherRoot
    } else {
      throw new Error('Falha ao buscar dados do clima.')
    }
  }

  async GetWeatherByCity(cityName: string): Promise<WeatherRoot> {
    const url = `${this.WEATHER_ENDPOINT}/city?city=${cityName}`
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

  async GetForeCastByCoord(lat: number, lon: number): Promise<ForeCastRoot> {
    const url = `${this.WEATHER_ENDPOINT}/forecast-coord?lat=${lat}&lon=${lon}`   
    const response = await this.executaFetch(url, 'GET')
    if (response.ok) {
      const data = await response.json()
      return data as ForeCastRoot
    } else {
      throw new Error('Falha ao buscar dados do clima.')
    }
  }

  async GetForeCastByCity(cityName: string): Promise<ForeCastRoot> {
    const url = `${this.WEATHER_ENDPOINT}/forecast-city?city=${cityName}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      return data as ForeCastRoot
    } else {
      if (response.status == 404) {
        throw new Error('Cidade não encontrada.')
      } else
        throw new Error('Falha ao buscar dados do clima.')
    }
  }

  async executaFetch(url: string, type: string = "GET", body: any = null): Promise<Response> {    
    const response = await fetch(url, {
      method: type,
    })
    return response
  }

}