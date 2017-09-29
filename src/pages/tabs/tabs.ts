import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Help4Page } from '../help4/help4';
import { BarcodeScannerPage } from '../barcode-scanner/barcode-scanner';
import { MyCartPage } from '../my-cart/my-cart';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = Help4Page;
  tab5Root = BarcodeScannerPage;
  tab6Root= MyCartPage;
 
  constructor() {

  }
}
