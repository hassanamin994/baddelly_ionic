import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Observable } from 'rxjs/Observable';
import { RequestMethod } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage'
import { AuthResponse } from '../models/auth.interface'

@Injectable()
export class UserService {
    isLoggedIn: boolean= false;

    constructor(
        private httpService: HttpService,
        private fb: Facebook,
        private alrtCtrl: AlertController,
        private storage: NativeStorage
    ) {}

    loginFacebook() {
        return Observable.create(observer => {
            
            this.fb.login(['public_profile', 'user_friends', 'email'])
            .then((response: FacebookLoginResponse) => {
                if (response && response.authResponse.accessToken) {
                    // user is authenticated and retrieved access token
                    // this.alrtCtrl.create({message: JSON.stringify(response)}).present();
                    this.httpService.sendRequest(RequestMethod.Post, ['auth', 'facebook'], null, {accessToken: response.authResponse.accessToken}, false)
                    .subscribe((response: AuthResponse) => {
                        this.isLoggedIn = true;
                        this.storage.setItem('token', response.token);
                        this.storage.setItem('user', response.user);
                        observer.next(response);
                        observer.complete();
                    }, error => {
                        observer.error(error)
                    });
                }
            })
            .catch(error => {
                this.alrtCtrl.create({
                    message: JSON.stringify(error)
                }).present()

            });
        });
    }
}