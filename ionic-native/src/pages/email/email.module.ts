import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailPage } from './email';
import { EmailComposer } from '@ionic-native/email-composer';

@NgModule({
  declarations: [
    EmailPage,
  ],
  imports: [
    IonicPageModule.forChild(EmailPage),
  ],
  providers:[
    EmailComposer
  ]
})
export class EmailPageModule {}
