import { getNumberOfCurrencyDigits } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  // Tworzenie obiektu koszyka
  cart: Cart = {
    items: [],
  };

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    "productIMG",
    "name",
    "price",
    "quantity",

    "total",
    "action",
  ];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(items: Array<CartItem>): number {
    let day = this.onCalculateDays();
    return this.cartService.getTotal(items, day);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  minStartDate = new Date();
  minEndDate = new Date();
  date1: any;
  date2: any;
  Days: any;

  onCalculateDays(): number {
    const date1Modified = new Date(this.date1);
    const date2Modified = new Date(this.date2);
    this.minEndDate = this.getMinEndDate();
    const Time = date2Modified.getTime() - date1Modified.getTime();
    this.Days = Math.round(Time / (1000 * 3600 * 24));
    console.log(this.Days);
    return this.Days;
  }

  setNumberOfDays(): void {
    let day = this.onCalculateDays();
    this.cartService.setNumberOfDays(day);
  }

  getMinEndDate():Date{
    if(this.date1 == null){
      return this.minEndDate;
    }
    return new Date(this.date1);
  }
  setMinEndDate(date :Date):void{
    this.minEndDate = date;
  }
}
