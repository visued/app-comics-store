import { ThisReceiver } from "@angular/compiler";

export class Cart {
    data: Datum[] | undefined;
    validationErrors: any[] | undefined;
}

export class Datum {
    Datum(quantity: number, products: Product[], closed: string) {
        this.quantity = quantity;
        this.products = products;
        this.closed = closed;
    }
    id: number | undefined;
    quantity: number | undefined;
    products: Product[] | undefined;
    closed: string | undefined;
}

export class Product {
    Product(name: string, description: string, price: number, productImage: ProductImage) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.productImage = productImage;

    }
    id: number | undefined;
    name: string | undefined;
    description: string | undefined;
    price: number | undefined;
    productImage: ProductImage | undefined;

}

export class ProductImage {
    productImage(name: string, url: string) {
        this.extension = name;
        this.url = url;
    }
    extension: string | undefined;
    url: string | undefined;
}