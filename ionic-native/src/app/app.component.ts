import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular'; // <<<<<<<<<<<<
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// IMPORTAR TODAS AS PAGINAS QUE FOREM UTILIZADAS NO APP
import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: string}>;
// LEMBRAR DE SEMPRE INSTANCIAR DENTRO DO CONSTRUCTOR
  constructor(public modal : ModalController, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon:'home' },
      { title: 'Action Sheet', component: 'ActionSheetPage', icon:'albums'}, // FAZ APARECER NO MENU DA SIDEBAR
      {title: 'Modal', component: 'ModalPage', icon:'analytics'},
      {title: 'Barcode Scanner', component: 'BarcodePage', icon: 'barcode'},
      {title: 'Email', component: 'EmailPage', icon: 'md-mail' }
      //{ title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    //ALTERAR PARA APARECER A SETA DE VOLTAR NO APP PARA PUSH PARA QUE POSSA EXIBIR O VOLTAR

    if (page.title == 'Modal') {

      let profileModal = this.modal.create(page.component, {cssClass: 'insert-modal'});
      profileModal.onDidDismiss(data => {

        alert(data)

      });
      profileModal.present();      
    }else{
      this.nav.push(page.component)
    }
  }
}
