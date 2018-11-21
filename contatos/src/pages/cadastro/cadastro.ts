import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  cadastroForm: any;

  constructor(public navCtrl: NavController, public form:FormBuilder, public firebaseProvider : FirebaseProvider) {

    this.cadastroForm = form.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', Validators.required]
    })

  }

  cadastro(){

    let { nome, telefone, email } = this.cadastroForm.controls;

    if (!this.cadastroForm.valid) {
      
      if (!nome.valid) {
        alert('O campo NOME é obrigatório')
      }

      if (!telefone.valid){
        alert('O campo TELEFONE é obrigatório')
      }

      if (!email.valid){
        alert('O campo EMAIL é obrigatório')
      }


    } else {

      this.firebaseProvider.salvarContato(nome, telefone, email);
      
    }
  }

}
