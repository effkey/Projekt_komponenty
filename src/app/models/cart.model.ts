export interface Cart {
  items: Array<CartItem>;
}
export interface CartItem {
  productIMG: string;
  name: string;
  price: number;
  quantity: number;
  id: number;
  daysCount: number;
}
