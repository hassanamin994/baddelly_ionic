import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { RequestMethod } from '@angular/http';
import { Product } from '../models/product';

@Injectable()
export class ProductService extends HttpService {

    getProducts(query: any) {
        return this.sendRequest(RequestMethod.Get, ['products'], query, null, false);
    }

    addProduct(product: Product) {
        return this.sendRequest(RequestMethod.Post, ['products'], null, product, true);
    }

    updateProduct(id: string, product: Product) {
        return this.sendRequest(RequestMethod.Patch, ['products', id], null, product, true);
    }

    deleteProduct(id: string) {
        return this.sendRequest(RequestMethod.Delete, ['products', id], null, null, true);
    }
    
}