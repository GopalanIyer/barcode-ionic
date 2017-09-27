import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {BarcodeScannerPage} from '../barcode-scanner/barcode-scanner';

/**
 * Generated class for the Help4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-help4',
  templateUrl: 'help4.html',
})
export class Help4Page {
  email:any;
  password:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afauth: AngularFireAuth) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Help4Page');
  }
  login()
  {
    this.afauth.auth.signInWithEmailAndPassword(this.email,this.password).then(
      (res)=> {
        console.log(res);
        this.navCtrl.push(BarcodeScannerPage);
        
      }
    ).catch(
      (err)=>{
        console.log(err.message);
        
      }
    )
  }

}
