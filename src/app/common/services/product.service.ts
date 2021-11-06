import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { PRODUCT_SAMPLE } from "src/app/pages/product-details/config/product-sample-data";
import { Product } from "../models/product.model";

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [ PRODUCT_SAMPLE ];

  constructor() {}

  getProductDetails(productId: number): Observable<Product> {
    const product = <Product>this.products.find(product => {
      return product.id === productId
    });
    return of(product);
  }
  
}