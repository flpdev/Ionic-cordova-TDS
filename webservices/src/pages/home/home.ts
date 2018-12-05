import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cursos: any;
  result: any;
  data: any;

  constructor(public navCtrl: NavController, public restProvider: RestProvider) {

    var teste = this.getCursos();
    console.log(teste);

  }


  getCursos() {
    this.restProvider.getCursos()
    .then(data => {

      this.cursos = data;
      this.result = this.data._embedded.cursos;
   
    });
    }
}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};