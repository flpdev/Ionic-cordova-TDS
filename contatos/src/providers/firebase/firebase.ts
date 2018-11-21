import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// IMPORTAR ABAIXO PARA CONEXÃO FIREBASE
//import {AngularFire} from 'angularfire2';
import { Http, Jsonp} from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase'

@Injectable()
export class FirebaseProvider {

  private urlBase = "https://contatos-ionic-felipe.firebaseio.com/";

  // INICIAR NO CONSTRUCTOR O ANGULARFIRE E JSONP
  constructor(public http: Http, public jsonp:Jsonp) { }

  public getContatos() {
    return new Promise(resolve=>{
      this.http.get(`${this.urlBase}contatos.json`)
          .subscribe(res => resolve(res.json()));
    })
  }

  public salvarContato(nome, telefone, email){
    firebase.database().ref('contatos').push({
      nome: nome,
      telefone: telefone,
      email: telefone
    })

    
  }
}
