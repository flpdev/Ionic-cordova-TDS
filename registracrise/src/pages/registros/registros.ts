import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-registros',
  templateUrl: 'registros.html',
})
export class RegistrosPage {

  intensidades: Array<Array<String>> = [
    ["Fraca","#F7FE2E"],
    ["Moderada", "#FF8000"],
    ["Forte", "#FF0000"]
  ]

  turno: Array<Array<String>> = [
    ["Manhã", "#A9D0F5"],
    ["Tarde", "#5882FA"],
    ["Noite", "#013ADF"]
  ]

  registrosFiltrados:any;
  qtdRegistrosFiltrados: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public loading: LoadingController) {

    let load = this.loading.create({
      content: 'Carregando...'
    });

    load.present();

    this.storage.get('registroCrises').then(registrosRetornados => {
      this.registrosFiltrados = []
        for (let index = 0; index < registrosRetornados.length; index++) {
          this.registrosFiltrados.push({

            intensidade: registrosRetornados[index].intensidade,
            turno: registrosRetornados[index].turno,
            data: registrosRetornados[index].data,
            observacao: registrosRetornados[index].observacao

          })          
        }

        this.qtdRegistrosFiltrados = this.registrosFiltrados.length;

    });

    load.dismiss();

  }

  filtrarRegistros(ini, fim, int, tur){

    if (condition) {
      
    }
    


  }
}
