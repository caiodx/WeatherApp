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
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  removeGlobalSetting(key: string): void {
    localStorage.removeItem(key);
  }

}
