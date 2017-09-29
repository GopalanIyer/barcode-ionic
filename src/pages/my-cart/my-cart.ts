import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


/**
 * Generated class for the MyCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-cart',
  templateUrl: 'my-cart.html',
})
export class MyCartPage {
  amt:number=0;
  list:FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afdb:AngularFireDatabase ) {
    this.list=afdb.list('/list');
    this.list.subscribe(snapshot=>{
      this.amt=0;

      snapshot.forEach(item=>{
        this.amt+=item.cost * item.quantity;

      })
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCartPage');
  }
  add()
  {
    let obj={
      name:'Sugar',
      cost:50,
      quantity:5,
      
    
      
    }
    
    this.list.push(obj);
  
  }
  remove(item)
  {
    this.list.remove(item);
  }

}
