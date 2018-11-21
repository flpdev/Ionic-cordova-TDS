import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ListaPage } from '../pages/lista/lista';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// IMPORT PARA CONEXÃO COM O FIREBASE
import { FirebaseProvider } from '../providers/firebase/firebase';
import { HttpModule, JsonpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//DADOS ABAIXO RETIRADO DAS CONFIGURAÇÕES DO SITE FIREBASE
export const firebaseconfig = {
  apiKey: "AIzaSyAkMmOl2_4tnOqTSnlcho6xkWHefxPup3c",
  authDomain: "contatos-ionic-felipe.firebaseapp.com",
  databaseURL: "https://contatos-ionic-felipe.firebaseio.com",
  projectId: "contatos-ionic-felipe",
  storageBucket: "contatos-ionic-felipe.appspot.com",
  messagingSenderId: "299604074312"
}

@NgModule({
  declarations: [
    MyApp,
    ListaPage,
    CadastroPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // COMANDO ABAIXO INICIALIZA A CONEXÃO COM O BANCO NO FIREBASE
    AngularFireModule.initializeApp(firebaseconfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule,
    JsonpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListaPage,
    CadastroPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider
  ]
})
export class AppModule {}
