import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage'; // IMPORT DO STORAGE PARA ACESSAR AS INFORMAÇÕES CADASTRADAS ANTERIORMENTE

/**
 * Generated class for the TarefasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tarefas',
  templateUrl: 'tarefas.html',
})
export class TarefasPage {

  tarefasAberto: any;
  qtdTarefasAberto: number = 0;

  constructor(public storage: Storage, public navCtrl: NavController, public toast: ToastController, public loading: LoadingController) {

    let load = this.loading.create({
      content: 'Carregando tarefas...'
    });

    load.present();

    this.storage.get('tarefasAberto').then(tarefasRetornadas =>{
      this.tarefasAberto = []; 
      for (let index = 0; index < tarefasRetornadas.length; index++) {
        this.tarefasAberto.push({
          nome: tarefasRetornadas[index].nome,
          data: tarefasRetornadas[index].data,
          cor: tarefasRetornadas[index].cor
        })   
      }

      console.log(this.tarefasAberto);
      this.qtdTarefasAberto = this.tarefasAberto.length;
    });

  load.dismiss();

}

  concluirTarefa(){

  }

  apagarTarefa(){

  }
}
