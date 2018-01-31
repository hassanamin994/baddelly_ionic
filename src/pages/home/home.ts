import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpService } from '../../providers/http.service';
import { RequestMethod } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private httpService: HttpService
    
  ) {
    httpService.sendRequest(RequestMethod.Get, ['posts'], null, null, false)
    .subscribe( res => {
      console.log(res)
    })
  }

}
