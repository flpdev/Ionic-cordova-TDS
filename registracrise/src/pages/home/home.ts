import { Component } from '@angular/core';
import { NavController, IonicPage, ToastController, LoadingController, Toast } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  registro: any=[{
    intensidade:"",
    turno:"",
    data:"",
    observacao:""
  }]

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

  todosRegistros: any;

  constructor(public navCtrl: NavController, public storage: Storage, public toast: ToastController, public loading: LoadingController) {

    let load = this.loading.create({
      content: 'Carregando registros...'
    });

    load.present();


    this.storage.get('registroCrises').then(registrosRetornados =>{
      this.todosRegistros = [];

      for (let index = 0; index < registrosRetornados.length; index++) {
        this.todosRegistros.push({
          nome: registrosRetornados[index].intensidade,
          turno: registrosRetornados[index].turno,
          data: registrosRetornados[index].data,
          observacao: registrosRetornados[index].observacao
        })        
      }
    });

    load.dismiss();

  }

  salvarRegistro(){

    let mensagem = this.toast.create({
      message: 'Registro inserido',
      duration: 3000,
      position: 'bottom'
    });

    this.todosRegistros.push({
      intensidade: this.registro.intensidade,
      turno: this.registro.turno,
      data: this.registro.data,
      observacao: this.registro.observacao
    });

    console.log(this.todosRegistros);

    this.storage.set('registroCrises', this.todosRegistros);

    mensagem.present();
    this.limparCampos();

  }

  limparCampos(){

    this.registro.intensidade = '';
    this.registro.turno='';
    this.registro.data = '';
    this.registro.observacao = '';

  }

  exibirRegistros(){
    this.navCtrl.push("RegistrosPage")
  }

}
