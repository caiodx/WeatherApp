import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {
  constructor() {
  }

  async GetPosition(): Promise<Position> {
    try {
      return await Geolocation.getCurrentPosition()
    } catch {
      throw new Error('Não foi possível obter coordenadas de GPS.')
    }

  }
}