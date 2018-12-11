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
    var directionService = new google.maps.DirectionsService;
    // VÁRIAVEL PARA MOSTRAR (RENDERIZAR) A ROTA NO MAPA
    var directionDisplay = new google.maps.DirectionsRenderer;

    //VARIÁVEIS DE ORIGEM E DESTINO CONVERTIDAS E PREPARADAS EM ARRAY
    var origem = {lat: parseFloat(latOri), lng: parseFloat(lngOri)};
    var destino = {lat: parseFloat(latDest), lng: parseFloat(lngDest)};

    //VARIÁVEIS COM OS ICONS DA LOCALIZAÇÃO
    var origemIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=O|FF0000|000000';
    var destinoIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=D|FFFF00|000000';

    //VARRIÁVEL DE LIMITES DA ROTA (UTILIZADOS NA APRESENTAÇÃO DAS ROTAS)
    var bounds = new google.maps.LatLngBounds;

    //VARIÁVEL QUE RENDERIZA O MAPA NO HTML
    var map = new google.maps.Map(document.getElementById('map'),{
      center: {lat: latOri, lng: lngOri},
      zoom: 17
    });

    //SETAR O MAPA NO HTML
    directionDisplay.setMap(map);

    //VARIÁVEL DE GEOCODER DO GOOGLE
    var geoCoder = new google.maps.Geocoder;

    //VARIÁVEL QUE REALIZARÁ O CÁLCULO DA DISTÂNCIA ENTRE DOIS PONTOS
    var service = new google.maps.DistanceMatrixService;

    service.getDistanceMatrix({
      origins: [origem],
      destinations: [destino],
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.METRIC
    },
    function(response, status){
      if (status !== 'OK') {
        alert('Houve algum problema' + status)
      }else{
        //ARMAZENA O ENDEREÇO DE ORIGEM
        var originList = response.originAddresses;
        //ARMAZENA O ENDEREÇO DE DESTINO
        var destinationList = response.destinationAddresses;

        //ELEMENTO RESUTADO (DIV NO HTML) PARA DEMONSTRAR O RESULTADO
        var resultado = document.getElementById('resultado');
        resultado.innerHTML = '';

        var showEnderecoOnMap = function(asDestination){
          var icon = asDestination ? destinoIcon : origemIcon;
          return function(results,status){
            console.log(status);
            if (status === 'OK') {
              map.fitBounds(bounds.extend(results[0].geometry.location))
            } else {
              alert('Geocode Erro 1')
            }
          }
        };

        directionService.route({
          origin:origem,
          destination: destino,
          travelMode: 'DRIVING'
        }, function(response, status){
          directionDisplay.setDirections(response);
        });

        for (let i = 0; i < originList.length; i++) {
          var results = response.rows[i].elements;
          geoCoder.geocode({'address' : originList[i]},
                           showEnderecoOnMap(false))   
                           
        for (let j = 0; j < results.length; j++) {
          geoCoder.geocode({'address':destinationList[j]},
                            showEnderecoOnMap(true));
                            
          resultado.innerHTML += '<b>DE:</b> ' + originList[i] + "<br><b>PARA:</b> " + destinationList[j] + 
                                 '<br><b>DISTÂNCIA:</b> ' + results[j].distance.text + ' <br><b>EM</b> ' +
                                 results[j].duration.text
        }
                        
        }

      }
    })

  }

}
