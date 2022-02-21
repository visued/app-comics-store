export class OrderEntity{
    OrderEntity(purchase: number, cartItemId: number){
        this.purchase = purchase;
        this.cartItemId = cartItemId;

    }
    purchase: number | undefined;
    cartItemId: number | undefined;
}