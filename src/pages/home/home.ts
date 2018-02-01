import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpService } from '../../providers/http.service';
import { RequestMethod } from '@angular/http';

import { NativeStorage } from '@ionic-native/native-storage';
import { AlertController } from 'ionic-angular';
import { ApiService } from '../../providers/api.service';
import { Product } from '../../models/product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  products: Product[] = [];
  searchFilter: any = {};

  constructor(
    public navCtrl: NavController,
    private storage: NativeStorage,
    private alertCtrl: AlertController,
    private apiService: ApiService
        
  ) {
    this.fetchProducts();
  }

  fetchProducts(searchFilter: any = {}) {

    this.apiService.product.getProducts(searchFilter)
    .subscribe((products: Product[]) => {
      this.products = products;
    }, err => {
      this.alertCtrl.create({
        message: 'Something went wrong while getting products',
        buttons: ['Ok']
      }).present()
    })    
  }

  onSearchInputChange(value: string) {
    
    this.searchFilter['title'] = value.trim();
    this.fetchProducts(this.searchFilter);
  }
}
