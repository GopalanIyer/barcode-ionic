import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NgxQRCodeModule} from 'ngx-qrcode2';
import { BarcodeScanner} from '@ionic-native/barcode-scanner';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Help4Page } from '../pages/help4/help4';
import { BarcodeScannerPage } from '../pages/barcode-scanner/barcode-scanner';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export const config={
    apiKey: "AIzaSyDE192oaja3ZBytzpbTCogj-vWe5qWHAE8",
    authDomain: "ionic-9d2c4.firebaseapp.com",
    databaseURL: "https://ionic-9d2c4.firebaseio.com",
    projectId: "ionic-9d2c4",
    storageBucket: "",
    messagingSenderId: "813628054701"
  }
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Help4Page,
    BarcodeScannerPage,
    
  ],
  imports: [
    BrowserModule,
    NgxQRCodeModule,
    AngularFireModule.initializeApp(config),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Help4Page,
    BarcodeScannerPage,
  ],
  providers: [
    StatusBar,
    BarcodeScanner,
    SplashScreen,
    AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
