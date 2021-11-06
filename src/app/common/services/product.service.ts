import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Product } from "../models/product.model";

@Injectable({ providedIn: 'root' })
export class ProductService {

  constructor(private http: HttpClient) {}

  getProductDetails(productId: number): Observable<Product> {
    return this.http.get<Product[]>('api/products.json').pipe(
      map(products => {
        return <Product>products.find(product => product.id === productId);
      })
    );
  }
  
}