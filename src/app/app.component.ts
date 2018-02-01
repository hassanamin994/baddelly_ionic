import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { AuthenticationPage } from '../pages/authentication/authentication';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  authenticationPage = AuthenticationPage;
  homePage = HomePage;
  aboutPage = AboutPage;

  @ViewChild('nav') nav: NavController;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any, params: any = {}) {
    this.nav.setRoot(page, params);  
  }
}
