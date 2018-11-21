import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import load from 'lodash';

@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html'
})
export class ListaPage {

  contatos = [];
  todosContatos: any;

  constructor(public navCtrl: NavController, public firebaseProvider : FirebaseProvider) {

    this.firebaseProvider.getContatos().then(contatosDoFirebase => {
      this.todosContatos = contatosDoFirebase;

      this.todosContatos = load.orderBy(this.todosContatos, ['nome'], ['asc']);

      for(const key of Object.keys(this.todosContatos)){
        this.contatos.push({
          nome: this.todosContatos[key].nome,
          telefone: this.todosContatos[key].telefone,
          email: this.todosContatos[key].email
        })
      }
    })

  }

}
