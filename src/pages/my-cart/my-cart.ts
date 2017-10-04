import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
declare var cordova: any;

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
  amt: number = 0;
  list: FirebaseListObservable<any[]>;
  scannedcode = null;
  cartSnapshot: any;
  listSnapshot: any;
  cart = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public afdb: AngularFireDatabase, public alrt: AlertController, private barcodeScanner: BarcodeScanner) {
    this.list = afdb.list('/list');
    this.list.subscribe(snapshot => {
      this.listSnapshot = snapshot;
    });
    afdb.list('/cart').subscribe(snapshot => {
      this.cartSnapshot = snapshot;

      snapshot.forEach(item => {
        this.amt = 0;
        this.listSnapshot.forEach(listitem => {
          if (item.$key == listitem.$key) {
            this.amt += listitem.cost * listitem.quantity;
            this.cart.push({
              key: listitem.$key,
              name: listitem.name,
              cost: listitem.cost,
              quantity: item.quantity

            });

          }

        });

      });
    });

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MyCartPage');
  }
  add(value) {
    this.cartSnapshot.forEach(element => {
      let found = false;
      if (element.$key == value.$key) {
        found = true;
        this.afdb.object('/cart/' + value.$key).update({
          quantity: element.quantity + value.quantity
        });
      }
      if (!found) {
        this.afdb.object('/cart/' + value.$key).set({
          quantity: value.quantity
        })
      }

    });
    // this.list.push(obj);

  }
  checkout() {
    let data = `<html> 
      <table>
        <tr>
          <th> Name </th>
          <th> Cost </th>
          <th> Quantity </th>
          <th> Total </th>
        </tr>  
    `;
    this.cart.forEach(element=>{
      data+=
      `
      <tr>
        <td>`+ element.name+`</td>
        <td>`+ element.cost+`</td>
        <td>`+ element.quantity+`</td>
        <td>`+ element.cost*element.quantity+`</td>
        `
    });
       data+=
      `
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>`+ this.amt+`</td>
        `
    cordova.plugins.pdf.htmlToPDF({
      data: "",
      documentSize: "A4",
      landscape: "portrait",
      type: "share"

    },
      (success) => {

      },
      (error) => {

      });

  }



  remove(item) {
    this.list.remove(item);
  }
  scan() {
    this.barcodeScanner.scan().then(brcode => {
      if (brcode.text == '') {
        console.log("Scan Cancelled");
        return;
      }
      this.afdb.object('/list/' + brcode.text).subscribe(item => {
        console.log(JSON.stringify(item));
        if (item.$value == null) {
          console.log('Undefined scan');
          return;
        }
        const alert = this.alrt.create({
          title: item.name,
          inputs: [
            {
              name: 'quantity',
              placeholder: 'Quantity'
            }

          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Add',

              handler: data => {
                this.add(item.$value);
              }
            },
            {
              text: 'Save',
              handler: data => {
                this.afdb.object('/list/' + item.$key).update({ quantity: data.quantity });

              }
            }
          ]
        });
        this.afdb.object('/list/' + item.$key).subscribe(snapshot => {
          alert.setSubTitle(snapshot.cost);
        })
        alert.present();

      });

    }, (err) => {
      console.log('Error: ', err);

    });
  }
  edit(obj) {

    const alert = this.alrt.create({
      title: obj.name,
      inputs: [
        {
          name: 'quantity',
          placeholder: 'Quantity'
        }

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',

          handler: data => {
            this.add(obj.$value);
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.afdb.object('/list/' + obj.$key).update({ quantity: data.quantity });

          }
        }
      ]
    });
    this.afdb.object('/list/' + obj.$key).subscribe(snapshot => {
      alert.setSubTitle(snapshot.cost);
    })
    alert.present();
  }
}


