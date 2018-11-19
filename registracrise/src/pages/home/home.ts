import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  registro: any=[{
    intensidade:"",
    data:"",
    observacao:""
  }]

  intensidades: Array<Array<String>> = [
    ["Fraca","#F7FE2E"],
    ["Moderada", "#FF8000"],
    ["Forte", "#FF0000"]
  ]

  constructor(public navCtrl: NavController) {

  }

}
