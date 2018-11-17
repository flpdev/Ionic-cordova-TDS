import { Component } from '@angular/core';
import { NavController, IonicPage, ToastController, LoadingController } from 'ionic-angular'; // importar ionic page para lazyload // importar toast controller
import { Storage } from '@ionic/storage';

import {Camera, CameraOptions} from '@ionic-native/camera';

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
    cor:"",
    foto:""
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


  //VARIAVEIS PARA UTLIZIAÇÃO DA CÂMERA
  picture: any;
  temFoto = false;

   
  //DECLARAR A UTILIZAÇÃO DO STORAGE NO CONSTRUTOR (ISSO INDICA QUE O CONSTRUTOR HERDA DO STORAGE APOS A CHAMADA)
  constructor(public camera: Camera, public storage: Storage, public navCtrl: NavController, public toast: ToastController, public loading: LoadingController) {

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
          cor: tarefasRetornadas[index].cor,
          foto: tarefasRetornadas[index].foto

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
      cor: this.tarefa.cor,
      foto: this.picture // SALVAR TAREFA NA VARIAVEI UTILIZA A VARIAVEL DO PROCEDIMENTO TAKECAMERA
    }) 

    this.storage.set('tarefasAberto',this.todasTarefas);

    mensagem.present();
    this.limparCampos();
  }

  openTarefas(){
    this.navCtrl.push("TarefasPage")
  }

  limparCampos(){
    this.tarefa.nome = '';
    this.tarefa.data = '';
    this.tarefa.cor = '';
    this.tarefa.foto = '';
  }

  takeCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;

      this.picture = base64Image;
      this.temFoto = true;

    }, (err) => {
     // Handle error
    })
  }

}
