import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/shopping-cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private _cart: CartItem[] = [];

  private get cartItemCount(): number {
    return this._cart
      .map(item => item.quantity)
      .reduce((acc, quantity) => acc + quantity, 0);
  }

  private cartVisibilitySource = new BehaviorSubject<boolean>(false);
  private shoppingCartSource = new BehaviorSubject<CartItem[]>(this._cart);
  private itemCountSource = new BehaviorSubject<number>(this.cartItemCount);
  cartVisibility$ = this.cartVisibilitySource.asObservable();
  shoppingCart$ = this.shoppingCartSource.asObservable();
  itemCount$ = this.itemCountSource.asObservable();

  constructor() { }

  private updateShoppingCart(): void {
    this.cartVisibilitySource.next(true);
    this.shoppingCartSource.next(this._cart);
    this.itemCountSource.next(this.cartItemCount);
  }
  
  toggleCart(visible: boolean): void {
    this.cartVisibilitySource.next(visible);
  }

  addItemToCart(newItem: CartItem): void {
    /** Check if Item exists */
    const itemInCart = this._cart.find(item => item.id === newItem.id);

    if (!itemInCart) this._cart.unshift(newItem);
    else {
      itemInCart.quantity += newItem.quantity;
      itemInCart.totalPrice += newItem.totalPrice;
    }
    this.updateShoppingCart();
  }

  removeItemFromCart(id: number): void {
    this._cart = this._cart.filter(item => item.id !== id);
    this.updateShoppingCart();
  }
  
}
