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
  // product: Product | undefined = {
  //   id: 1,
  //   title: "Triban RC500",
  //   price: 125,
  //   type: "szosa",
  //   description: "Rower szosowy Triban RC500 z hamulcami tarczowymi",
  //   size: 165,
  //   color: "czerwony",
  //   productCount: 10,
  //   image:
  //     "https://miastorowerow.pl/65945/rower-28-kellys-arc-30-l-szosa-rowery-szosowe.jpg",

  //   // image: "http://via.placeholder.com/150",
  // };

  @Output() addToCart = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
