import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular'; // importar ionic page para lazyload
@IonicPage() // importar ionic page para lazyload
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //Esse é o nossso objeto tarefa (os campos que constam no htl)
  tarefa: any=[{
    nome:"",
    data:"",
    cor:""
  }]

 //Esse é o array de cores, para escolhermos ao cadatrar uma tarefa
  cores: Array<Array<String>> = [
    ["Azul", "#0039b5"],
    ["Verde", "#00b51e"],
    ["Amarelo", "#c1c100"],
    ["Vermelho", "#b50000"],
    ["Preto","#000000"]
  ]

  constructor(public navCtrl: NavController) {

  }

  salvarTarefa(){
    console.log(this.tarefa)
  }

}
