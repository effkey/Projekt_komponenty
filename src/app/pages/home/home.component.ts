import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styles: [],
})
export class HomeComponent implements OnInit, OnDestroy {
  type: string | undefined;
  products: Array<Product> | undefined;
  productsSubscription: Subscription | undefined;
  sort: string | undefined;

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = `_sort=price&_order=${newSort}`;
    this.getProducts();
  }
  getProducts(): void {
    var list: string[] = [];
    if (this.type != undefined) {
      list = list.concat(this.type);
    }
    if (this.sort != undefined) {
      list = list.concat(this.sort);
    }
    this.productsSubscription = this.storeService
      .getAllProducts(list)
      .subscribe((_products) => {
        this.products = _products;
      });
  }
  clearFilters(str: string): void {
    this.type = undefined;
    this.getProducts();
  }

  // Sortowanie po typie
  onShowType(newType: string): void {
    this.type = `type=${newType}`;
    this.getProducts();
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      productIMG: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
      daysCount: 3,
    });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  onSortUpdated(newSort: string): void {
    this.sort = `_sort=price&_order=${newSort}`;
    this.getProducts();
  }
}
