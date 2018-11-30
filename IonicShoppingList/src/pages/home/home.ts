import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { Observable } from 'rxjs';
import { Item } from '../../models/item/item.model';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  shoppingList$ : Observable<Item[]>

  constructor(public navCtrl: NavController, public navParams: NavParams,
                     private shopping : ShoppingListService) {

    this.shoppingList$ = this.shopping
      .getShoppingList() //DB LIST
      .snapshotChanges() // KEY AND VALUE
      .map(
        changes => {
          return changes.map(c=> ({
            key: c.payload.key,
            ...c.payload.val(),
          }));
        });
  }
}
