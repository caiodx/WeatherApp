import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalConfigService {

  constructor() { }
  saveGlobalSetting(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getGlobalSetting(key: string): any {
    const value = localStorage.getItem(key)
    console.log(value) 
    if (value?.toString() !== "undefined" && value?.toString() !== null && value?.toString() !== undefined ){
      return JSON.parse(value?.toString() ?? "")
    }else{
      return null
    }
  }

  removeGlobalSetting(key: string): void {
    localStorage.removeItem(key);
  }

}
