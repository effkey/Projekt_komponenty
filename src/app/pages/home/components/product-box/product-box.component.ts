import { outputAst } from "@angular/compiler";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Product } from "src/app/models/product.model";

@Component({
  selector: "app-product-box",
  templateUrl: "./product-box.component.html",
})
export class ProductBoxComponent {
  // dodawanie produktu do koszyka

  @Input() product: Product | undefined;

  @Output() addToCart = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
