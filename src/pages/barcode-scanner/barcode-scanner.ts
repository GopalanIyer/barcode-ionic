import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';

@IonicPage()
@Component({
  selector: 'page-barcode-scanner',
  templateUrl: 'barcode-scanner.html',
})
export class BarcodeScannerPage {
  qrcode=null;
  scannedcode=null;
  generatedcode=null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner:BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BarcodeScannerPage');
  }
  scanner()
  {
    this.barcodeScanner.scan().then(brcode=>{
      this.scannedcode=brcode.text;
    }, (err)=>{
      console.log('Error: ',err);
      
    });

  }
  generate()
  {
    this.generatedcode=this.qrcode;
  }

}
