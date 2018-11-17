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

  erroEmail= false;
  erroSenha= false;

  msgEmail= '';
  msgSenha= '';  

  constructor(public navCtrl: NavController, public navParams: NavParams, public form: FormBuilder) {
    this.loginForm = form.group({
      email:['testeteste', Validators.required], // LOGIN PREENCHIDO SEM NECESSIDADE DE DIGITAR (DESENOLVIMENTO)
      senha:['123123', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])]

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    let { email, senha } = this.loginForm.controls;

    if(!this.loginForm.valid){

      if(!email.valid){
        this.erroEmail = true;
        this.msgEmail = 'Email inválido';
      }else{
        this.erroEmail = false;
        this.msgEmail = ''
      }

      if(!senha.valid){
        this.erroSenha = true;
        this.msgSenha = 'A senha precisa ter de 6 a 20 caracteres';
      }else{
        this.erroSenha = false;
        this.msgSenha = '';
      }

    }else{
      alert('Login realizado');
      this.navCtrl.setRoot('HomePage');
    }

  }

}
