import { isNgTemplate, ThisReceiver } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";
import { Cart, CartItem } from "../models/cart.model";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackBar: MatSnackBar) {}

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    // Sprawdzamny czy produkt jest już w koszyku
    const itemInCart = items.find((_item) => _item.id === item.id);

    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this._snackBar.open("Dodano do koszyka jeden produkt", "Ok", {
      duration: 3000,
    });
  }

  getTotal(items: Array<CartItem>, Day?: any): number {
    if (Day === undefined) {
      Day = 1;
    }
    return items
      .map((item) => item.price * item.quantity * Day)
      .reduce((prev, current) => prev + current, 0);
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open("Usunięto koszyk", "Ok", {
      duration: 3000,
    });
  }

  removeFromCart(item: CartItem, upadate = true): Array<CartItem> {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );

    if (upadate) {
      this.cart.next({ items: filteredItems });
      this._snackBar.open("1 przedmiot usunięty z kosza", "Ok", {
        duration: 3000,
      });
    }
    return filteredItems;
  }

  removeQuantity(item: CartItem): void {
    let itemsForRemoval: CartItem | undefined;
    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;

        if (_item.quantity === 0) {
          itemsForRemoval = _item;
        }
      }
      return _item;
    });

    if (itemsForRemoval) {
      filteredItems = this.removeFromCart(itemsForRemoval, false);
    }

    this.cart.next({ items: filteredItems });
    this._snackBar.open("1 przedmiot usunięty z koszyka.", "Ok", {
      duration: 3000,
    });
  }
  setNumberOfDays(day?: any): void {
    return day;
  }
}
