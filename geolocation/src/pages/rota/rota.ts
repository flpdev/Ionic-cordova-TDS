import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-rota',
  templateUrl: 'rota.html',
})
export class RotaPage {

  latOri: number;
  lngOri: number;
  latDest: number;
  lngDest: number;
  map: any;

  constructor(public geolocation: Geolocation, 
              public navCtrl: NavController, 
              public navParams: NavParams,
              public platform: Platform) {

    this.platform.ready().then(() => {
      this.geolocation.getCurrentPosition().then(result=>{
        this.latOri = result.coords.latitude;
        this.lngOri = result.coords.longitude;
      })
    })

  }

  calcRota(latOri, lngOri, latDest, lngDest){
    // VARIÁVEL DO SERVIÇO DE DIREÇÃO (API) DO GOOGLE.
    var directionService = new google.maps.DirectionService;
    // VÁRIAVEL PARA MOSTRAR (RENDERIZAR) A ROTA NO MAPA
    var direcionDisplay = new google.maps.DirecionRenderer;
  }

}
