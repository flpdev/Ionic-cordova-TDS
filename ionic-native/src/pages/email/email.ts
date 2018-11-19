import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EmailComposer} from '@ionic-native/email-composer';

@IonicPage()
@Component({
  selector: 'page-email',
  templateUrl: 'email.html',
})
export class EmailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public emailSend: EmailComposer) {

    let email = {
      to: 'max@mustermann.de',
      cc: 'erika@mustermann.de',
      bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        'file://img/logo.png',
        'res://icon.png',
        'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        'file://README.pdf'
      ],
      subject: 'Cordova Icons',
      body: 'How are you? Nice greetings from Leipzig',
      isHtml: true
    };
    
    // Send a text message using default options
    this.emailSend.open(email);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailPage');
  }

}
