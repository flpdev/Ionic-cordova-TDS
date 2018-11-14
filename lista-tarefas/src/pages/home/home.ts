import { Component } from '@angular/core';
import { NavController, IonicPage, ToastController, LoadingController } from 'ionic-angular'; // importar ionic page para lazyload // importar toast controller
import { Storage } from '@ionic/storage';
@IonicPage() // importar ionic page para lazyload
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //Esse é o nossso objeto tarefa (os campos que constam no html)
  tarefa: any=[{
    nome:"",
    data:"",
    cor:""
  }]

 //Esse é o array de cores, para escolhermos ao cadatrar uma tarefa
  cores: Array<Array<String>> = [
    ["Azul", "#0039b5"],
    ["Verde", "#00b51e"],
    ["Amarelo", "#c1c100"],
    ["Vermelho", "#b50000"],
    ["Preto","#000000"]
  ]

  //ARRAY DE TAREFAS EM ABERTO PARA QUE O STORAGE POSSA INCREMENTAR E ADICIONAR MAIS DE UM REGISTRO

  todasTarefas: any;
   
  //DECLARAR A UTILIZAÇÃO DO STORAGE NO CONSTRUTOR (ISSO INDICA QUE O CONSTRUTOR HERDA DO STORAGE APOS A CHAMADA)
  constructor(public storage: Storage, public navCtrl: NavController, public toast: ToastController, public loading: LoadingController) {

    let load = this.loading.create({
      content: 'Carregando tarefas...'
    });

    load.present();



    this.storage.get('tarefasAberto').then(tarefasRetornadas =>{
      //BUSCANDO AS TAREFAS EM ABERTO NO STORAGE E JOGANDO PARA A "VARIÁVEL" TAREFASRETORNADAS
      this.todasTarefas = []; // SETANDO A NOSSA VARIAVEL PARA UM ARRAY VAZIO
      //FAZENDO UM LOOP DO OBJETO RETORNADO DO STORAGE
      for (let index = 0; index < tarefasRetornadas.length; index++) {
        this.todasTarefas.push({
          nome: tarefasRetornadas[index].nome,
          data: tarefasRetornadas[index].data,
          cor: tarefasRetornadas[index].cor
        })   
      }

    });
    load.dismiss();
  }

  salvarTarefa(){

      let mensagem = this.toast.create({
        message: 'Tarefa salva com sucesso',
        duration: 3000,
        position: 'bottom'
      });

    this.todasTarefas.push({
      nome: this.tarefa.nome,
      data: this.tarefa.data,
      cor: this.tarefa.cor
    }) 

    this.storage.set('tarefasAberto',this.todasTarefas);

    mensagem.present();

  }

}
