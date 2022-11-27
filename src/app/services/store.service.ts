import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";

const BASE_URL = "http://localhost:3000";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(sort = "desc", type?: string): Observable<Array<Product>> {
    if (type != undefined) {
      return this.httpClient.get<Array<Product>>(
        `${BASE_URL}/product?type=${type}`
      );
    }
    return this.httpClient.get<Array<Product>>(
      `${BASE_URL}/product?_sort=price&_order=${sort}`
    );
  }

  getAllTypes(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(`${BASE_URL}/type`);
  }
}
