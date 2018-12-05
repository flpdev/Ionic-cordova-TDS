import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  locais = [{
    nome: 'Parque das Águas',
    endereco: 'Av. Hermina Torquarto da Silva - Centro Político Administrativo, Cuiabá - MT, 78050-970',
    latitude: -15.5680553,//-15.6064983,
    longitude: -56.0821843//-56.0652759
  },
  {
    nome: 'Havan',
    endereco: 'Av. Historiador Rubens de Mendonça, 2555 - Bosque da Saude, Cuiabá - MT, 78050-000',
    latitude: -15.5768033,//-15.6064983,
    longitude: -56.0773229//-56.0652759
  }]

  map: any;
  markers: any;

  constructor(public navCtrl: NavController, 
              public geolocation: Geolocation,
              public platforom: Platform) {}

  ionViewWillEnter(){
    //valida se a plataforma esta carregada e pronta
    //para executar os plugins, caso OK executa o que
    //estiver dentro do then.
    this.platforom.ready().then(() => {
      this.initPage();
    });
  }

  initPage(){
    this.geolocation.getCurrentPosition().then(result => {
      this.loadMap(result.coords.latitude, result.coords.longitude);
    })
  }

  loadMap(lat, lng){

    let latLng = new google.maps.LatLng(lat, lng);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: 'roadmap',
      disableDefaultUI: true
    }

    let element = document.getElementById('map');

    this.map = new google.maps.Map(element, mapOptions);

    // Defini atributos do marcador a ser exibido na tela
    let marker = new google.maps.Marker({
      position:latLng,
      title: 'Minha localização',
      icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
    })

    let content = `

      <div id="myid" class="item item-thumbnail-left item-text-wrap">
        <ion-item>
          <ion-row>
            <h6>`+ marker.title +`</h6>
          </ion-row>
        </ion-item>
      </div>  
    
    `
    this.addTitulo(marker,content);

    // Exibe marcador
    marker.setMap(this.map);

    this.addLocais();

  }

  addTitulo(marker,content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    })
  }

  addLocais(){
    this.markers = [];

    for(const key of Object.keys(this.locais)){

      let latLng = new google.maps.LatLng(this.locais[key].latitude, 
                                          this.locais[key].longitude);

      let marker = new google.maps.Marker({
        position: latLng,
        title: this.locais[key].nome,
        address: this.locais[key].endereco,
        icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
        
      })

      let content = `

      <div id="myid" class="item item-thumbnail-left item-text-wrap">
        <ion-item>
          <ion-row>
            <h6>`+ this.locais[key].nome +`</h6>
          </ion-row>
        </ion-item>
      </div>  

      `

      //adicionar o titulo

      this.addTitulo(marker,content)

      marker.setMap(this.map)

    }
  }

  goToLocal(){

    this.navCtrl.push('LocalPage', {locais : this.locais})
    
  }


}
