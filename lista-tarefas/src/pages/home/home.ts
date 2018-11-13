import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular'; // importar ionic page para lazyload
@IonicPage() // importar ionic page para lazyload
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}
