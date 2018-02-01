import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../../providers/api.service';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the AuthenticationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html',
})
export class AuthenticationPage {
  mode: string = '';
  title: string = '';
  submitButtonText = '';
  authenticationForm: FormGroup;

  constructor(
      private navCtrl: NavController, 
      private navParams: NavParams,
      private apiService: ApiService,
      private alertCtrl: AlertController
    ) {
    this.initForm();
  }

  initForm() {
    let formControls = {};
    formControls['email'] = new FormControl('', [Validators.required, Validators.email]);
    formControls['password'] = new FormControl('', Validators.required);
    if (this.mode == 'signup') {
      formControls['cpassword'] = new FormControl('', Validators.required);
    }
    this.authenticationForm = new FormGroup(formControls);
  }

  ionViewWillEnter() {
    this.mode = this.navParams.get('mode');
    switch(this.mode) {
      case "signin":
        this.title = "Sign In";
        this.submitButtonText = "Login";
        break;
      case "signup":
        this.title = "Sign Up";
        this.submitButtonText = "Register"
        break;
      default:
        this.title = "Sign In";
        this.submitButtonText = "Login"
    }
    this.initForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthenticationPage');
  }

  loginWithFacebook() {
    this.apiService.user.loginFacebook()
    .subscribe(res => {
      this.navCtrl.setRoot(HomePage);
    })
  }

}
