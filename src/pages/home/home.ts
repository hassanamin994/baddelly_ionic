import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpService } from '../../providers/http.service';
import { RequestMethod } from '@angular/http';

import { NativeStorage } from '@ionic-native/native-storage';
import { AlertController } from 'ionic-angular';
import { UserService } from '../../providers/user.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private httpService: HttpService,
    private storage: NativeStorage,
    private userService: UserService,
    private alertCtrl: AlertController
    
  ) {

    httpService.sendRequest(RequestMethod.Get, ['posts'], null, null, false)
    .subscribe( res => {
      console.log(res)
    })

    storage.getItem('token')
    .then(token => {
      if (token) {
        userService.isLoggedIn = true;
      }
    })
    .catch(err => {
      alertCtrl.create({
        message: JSON.stringify(err)
      }).present();
    })
    
  }

}
