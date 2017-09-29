import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  email: any;
  password: any;
  confirmpassword: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  signup() {
    let load = this.loadingCtrl.create({
      content: "Loading..Please Wait!!"
    });
    load.present();
    if (this.email != "" && this.password != "" && this.confirmpassword != "" && this.confirmpassword === this.password)
      this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          load.dismiss();
        })
        .catch((err) => {
          load.dismiss();
          console.log(err.message);
        });

  }

}
