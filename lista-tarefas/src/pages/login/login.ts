import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms'; // UTILIZADO PARA CRIAÇÃO DE FORMULARIOS E VALIDAÇÕES

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  imgUrl: string = 'assets/imgs/background.png';
  loginForm: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public form: FormBuilder) {
    this.loginForm = form.group({
      email:['', Validators.required],
      senha:['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])]

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    alert('teste');
  }

}
