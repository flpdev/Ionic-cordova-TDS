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
  tarefasConcluidas: any;
  qtdTarefasAberto: number = 0;
  qtdTarefasConcluidas: number =0;

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
          cor: tarefasRetornadas[index].cor,
          foto: tarefasRetornadas[index].foto
        })   
      }

      console.log(this.tarefasAberto);
      this.qtdTarefasAberto = this.tarefasAberto.length;
    });


this.storage.get('tarefasConcluidas').then(tarefasRetornadas =>{
        this.tarefasConcluidas = [];
        for(let index =0;index < tarefasRetornadas.length; index++){
        this.tarefasConcluidas.push({
        nome:tarefasRetornadas[index].nome,
        data:tarefasRetornadas[index].data,
        cor:tarefasRetornadas[index].cor,
        foto: tarefasRetornadas[index].foto 
        })
        }
        
        this.qtdTarefasConcluidas = this.tarefasConcluidas.length;
        });
        load.dismiss();

}

  concluirTarefa(index, tarefa, itemSelect){
    
    let load = this.loading.create({
      content: 'Apagando a tarefa...'
    })
    load.present();

    this.tarefasConcluidas.push({
      nome: tarefa.nome,
      data: tarefa.data,
      cor: tarefa.cor,
      foto: tarefa.foto
    })

    this.tarefasAberto.splice(index,1);

    this.storage.set('tarefasAberto', this.tarefasAberto);
    this.storage.set('tarefasConcluidas', this.tarefasConcluidas);

    this.qtdTarefasAberto = this.tarefasAberto.length;
    this.qtdTarefasConcluidas = this.tarefasConcluidas.length;

    itemSelect.close();
    load.dismiss();

  }

  apagarTarefa(index, itemSelect){
    let load = this.loading.create({
      content: 'Apagando a tarefa...'
      })
      load.present();
      this.tarefasAberto.splice(index,1);
      this.storage.set('tarefasAberto',this.tarefasAberto); //Apaga do array - tabela (tarefasAberto storage)
      this.qtdTarefasAberto = this.tarefasAberto.length;
      itemSelect.close();
      load.dismiss();
  }
}
