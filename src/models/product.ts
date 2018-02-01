import { User } from './user';
import { Category } from './category';

export class Product {

    constructor(
        public title: string,
        public description: string,
        public location: string,
        public trade_with: string[],
        public price: string[],
        public images: string[],
        public owner: User,
        public category: Category,
        public createdAt: Date,

    ) {}
}