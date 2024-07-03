import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';

@Injectable({
    providedIn: 'root'
  })
  export class GeoLocationService {
    constructor(private geolocation: Geolocation){
    }

    async GetPosition(): Promise<Geoposition> {
        return await this.geolocation.getCurrentPosition()
    }  
  }