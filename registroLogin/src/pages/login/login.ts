import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth'; // UTILIZADO NA AUTENTICAÇÃO


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth,
              public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(user: User){
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if(result){
        this.navCtrl.setRoot('HomePage'); //CASO LOGIN SUCCESS REDIRECIONA PARA PAGINA PRINCIPAL (SETROOT FAZ QUE A HOME SE TORNE A PAGINA PRINCIPAL)
      }          
    } catch (e) {
      console.log(e);
    }
       
  }

  register(){
    this.navCtrl.push('RegisterPage'); // NAVCTRL.PUSH REDIRECIONA A PAGINA
  }

}
