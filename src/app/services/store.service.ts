import { HttpClient } from "@angular/common/http";
import { STRING_TYPE } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";

const BASE_URL = "http://localhost:3000";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(filers: string[] = []): Observable<Array<Product>> {
    var filter: string = "";
    if (filers.length != 0) {
      filter = "?"
      filter = filter + filers.join('&')
    }
    return this.httpClient.get<Array<Product>>(
      `${BASE_URL}/product${filter}`
    );
  }

  Get(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${BASE_URL}/product/${id}`);
  }

  getAllTypes(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(`${BASE_URL}/type`);
  }
}
