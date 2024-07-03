import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonCheckbox, IonList, IonListHeader, IonItem, IonLabel, IonRadio, IonRadioGroup, IonInput } from '@ionic/angular/standalone';
import { GlobalConfigService } from 'src/app/services/global-config.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
  standalone: true,
  imports: [IonInput, IonRadioGroup, IonCheckbox, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonList, IonListHeader, IonItem, IonLabel, IonRadio]
})
export class ConfigPage implements OnInit {

  localizacaoSelecionada: string = 'pegarLocalizacaoAtual'; // Opção inicial
  public nomeCidade: string = 'teste';

  constructor(private globalConfigService: GlobalConfigService, public navCtrl: NavController) { }

  ngOnInit() {
  }

  voltarPaginaAnterior() {
    this.navCtrl.pop()
  }

  ChangeLocationType(event: CustomEvent) {
    this.localizacaoSelecionada = event.detail.value
  }

  ChangeCity(event: CustomEvent) {
    
    this.nomeCidade = event.detail.value
  }

  ionViewWillEnter() {
    this.LoadSettings()
  }

  ionViewWillLeave(){
    this.saveSettings()
  }

  saveSettings(){
    this.globalConfigService.saveGlobalSetting("localizacaoSelecionada", this.localizacaoSelecionada)
    this.globalConfigService.saveGlobalSetting("nomeCidade", this.nomeCidade)
    console.log(this.nomeCidade)
  }

  LoadSettings(){
    let localizacaoSelecionada = this.globalConfigService.getGlobalSetting("localizacaoSelecionada")
    let nomeCidade = this.globalConfigService.getGlobalSetting("nomeCidade")
    if (localizacaoSelecionada !== null && localizacaoSelecionada !== undefined && localizacaoSelecionada !== "")
      this.localizacaoSelecionada = localizacaoSelecionada
    if (nomeCidade !== null && nomeCidade !== undefined && nomeCidade !== "")
      this.nomeCidade = nomeCidade
  }

}
