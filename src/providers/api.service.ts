import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { ProductService } from "./product.service";


@Injectable()
export class ApiService {
    constructor(
        public user: UserService,
        public product: ProductService
    ) {}
}