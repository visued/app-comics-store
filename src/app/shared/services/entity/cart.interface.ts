export interface IDatum {
    quantity: number;
    products: IProduct[];
}

export interface IProduct {
    name: string;
    description: string;
    price: number;
    productImage: IProductImage;
}

export interface IProductImage {
    extension: string;
    url: string;
}