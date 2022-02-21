import { Component, NgModule } from '@angular/core';
import { DxButtonModule } from 'devextreme-angular';
import 'devextreme/data/odata/store';
import notify from 'devextreme/ui/notify';
import { map } from 'rxjs';
import { ComicsService } from 'src/app/shared/services/comics.service';
import { Cart } from 'src/app/shared/services/entity/cart.entity';
import { IProduct } from 'src/app/shared/services/entity/cart.interface';
import { OrderEntity } from 'src/app/shared/services/entity/OrderEntity';

@Component({
  templateUrl: 'list-cart.component.html'
})

export class ListCartComponent {
  dataSource: any;
  popupVisible = false;
  
  emailButtonOptions: any;

  closeButtonOptions: any;
  itemId : number = 0;
  purchase: number= 0;


  constructor(private service: ComicsService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  createOrder(){
    let order : OrderEntity = new OrderEntity();
    order.cartItemId = this.itemId;
    order.purchase = this.purchase;

    this.service.getCart().subscribe((result ) => {
      if(result.data?.length! > 0 && result.data != null){
        let cartItems = result;

        cartItems.data!.forEach((item) => {
          item.closed = 'Y';
        })
        debugger
        this.service.putCart(cartItems.data![0]).subscribe();
        this.service.postOrder(order).subscribe();
        this.loadData();
        notify('Ordem enviada com sucesso, obrigado!', 'success', 3000);        
      }
    });
  }

  loadData(){
    debugger
    this.service.getCart()
    .pipe(
      map((cart: Cart) => {
        if(cart != null && cart.data?.length!  > 0){
          debugger
          this.dataSource = cart.data![0].products!;
          this.itemId =  cart.data![0].id!;
          cart.data![0].products?.forEach((item) => {
            this.purchase += item.price!;
          })
        } else {
          this.dataSource = null;
          debugger
        }
      }))
    .subscribe();
  }
}