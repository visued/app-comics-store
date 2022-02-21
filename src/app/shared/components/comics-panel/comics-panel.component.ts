import { Component, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxListModule } from 'devextreme-angular/ui/list';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { Comics } from '../../services/entity/comics.entity';
import { DxButtonModule, DxFormModule, DxTileViewModule, DxToastModule } from 'devextreme-angular';
import { ComicsService } from '../../services/comics.service';
import { map } from 'rxjs/operators';
import notify from 'devextreme/ui/notify';
import { Cart, Product, ProductImage } from '../../services/entity/cart.entity';
import { IDatum } from '../../services/entity/cart.interface';

@Component({
  selector: 'app-comics-panel',
  templateUrl: 'comics-panel.component.html',
  styleUrls: ['./comics-panel.scss']
})

export class ComicsComponent {
  comics: Comics | undefined;
  data: any = [];
  dataCart: Cart = new Cart();
  currentComic: any;
  addPhoneButtonOptions: any;
  isVisible: boolean = false;
  message: string = '';
  type: string = 'info';
  newItemCart: IDatum | undefined;

  constructor(private service: ComicsService) {
  }

  ngOnInit(): void {
    this.loadData();
    this.getFirst();
  }

  listSelectionChanged = (e: any) => {
    this.currentComic = e.addedItems[0];
  }

  loadData() {
    this.service.getComics()
      .pipe(
        map((comics: Comics) => {
          this.data = comics.data?.results;
        }))
      .subscribe();
  }

  getFirst() {
    if (this.data) {
      this.currentComic = this.data[0];
    }
  }

  async addToCart(item: any) {
    if(item !=null){
      this.service.getCart().subscribe((result ) => {
        if(result.data?.length! > 0 && result.data != null){
          const data = result.data[0];
          let product: Product = new Product();
          let productImage: ProductImage = new ProductImage();
          productImage.extension = item.images[0].extension ?? '';
          productImage.url = item.images[0].path ?? '';
          product.name = item.title;
          product.description = item.description ?? 'Item sem descrição';
          product.price = item.prices[0].price ?? 0,
          product.productImage = productImage;
          data.products?.push(product);
          this.service.putCart(data).subscribe();
          console.log('Não tem nada então insere');
          notify('Quadrinho adicionado no carrinho :)', 'info', 3000);
        } else {
          this.newItemCart = {
            quantity: 1,
            products: [
              {
                name: item.title,
                description: item.description ?? 'Item sem descrição',
                price: item.prices[0].price ?? 0,
                productImage: {
                  extension: item.images[0].extension ?? '',
                  url: item.images[0].path ?? ''
                }
              },
            ]
          };
          this.service.postCart(this.newItemCart).subscribe();
          notify('Quadrinho adicionado no carrinho :)', 'info', 3000);
        }
      });
    }    
  }
}

@NgModule({
  imports: [
    DxListModule,
    DxContextMenuModule,
    CommonModule,
    DxTileViewModule,
    DxButtonModule,
    DxFormModule,
    DxToastModule
  ],
  declarations: [ComicsComponent],
  exports: [ComicsComponent]
})
export class ComicsModule { }

