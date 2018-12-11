import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//NAVPARAMS permite capturar os parâmetros passados por outra página.



/**
 * Generated class for the LocalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-local',
  templateUrl: 'local.html',
})
export class LocalPage {

lugares:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.lugares = this.navParams.get('locais');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocalPage');
  }

  openDetail(item){
    this.navCtrl.push('DetalhesPage', {local : item})
  }

}
