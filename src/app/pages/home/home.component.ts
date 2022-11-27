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
  sort = "desc";

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }
  getProducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.sort, this.type)
      .subscribe((_products) => {
        this.products = _products;
      });
  }

  // Sortowanie po typie
  onShowType(newType: string): void {
    this.type = newType;
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
    this.sort = newSort;
    this.getProducts();
  }
}
