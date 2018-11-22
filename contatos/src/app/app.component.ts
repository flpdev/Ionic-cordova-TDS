import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
/*
export const firebaseconfig = {
  apiKey: "AIzaSyAkMmOl2_4tnOqTSnlcho6xkWHefxPup3c",
  authDomain: "contatos-ionic-felipe.firebaseapp.com",
  databaseURL: "https://contatos-ionic-felipe.firebaseio.com",
  projectId: "contatos-ionic-felipe",
  storageBucket: "contatos-ionic-felipe.appspot.com",
  messagingSenderId: "299604074312"
}
*/
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      
      var config = {
        apiKey: "AIzaSyAkMmOl2_4tnOqTSnlcho6xkWHefxPup3c",
        authDomain: "contatos-ionic-felipe.firebaseapp.com",
        databaseURL: "https://contatos-ionic-felipe.firebaseio.com",
        projectId: "contatos-ionic-felipe",
        storageBucket: "contatos-ionic-felipe.appspot.com",
        messagingSenderId: "299604074312"
      };
      firebase.initializeApp(config);
      
    });

    //firebase.initializeApp(firebaseconfig);
  }
}
