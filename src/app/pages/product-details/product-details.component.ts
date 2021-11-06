import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/common/models/product.model';
import { CartItem } from 'src/app/common/models/shopping-cart-item.model';
import { ProductService } from 'src/app/common/services/product.service';
import { ShoppingCartService } from 'src/app/common/services/shopping-cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product!: Product;
  form!: FormGroup;
  quantitySubscription!: Subscription;
  fetchingProductDetails = true;

  constructor(
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    /** Get Product **/
    this.fetchingProductDetails = true;
    this.productService.getProductDetails(4579)
      .subscribe(product => {
        this.product = product;
        this.initProductForm();
      }).add(() => this.fetchingProductDetails = false);
  }

  ngOnDestroy(): void {
    this.quantitySubscription.unsubscribe();
  }

  get productDiscount(): string {
    return `${this.product.currentPrice / this.product.stockPrice * 100}%`;
  }

  private initProductForm(): void {
    this.form = this.fb.group({
      quantity: [ 1, Validators.required ],
      totalPrice: this.product.currentPrice
    });

    /** Listen to quantity value change */
    this.quanityChanges();
  }

  private resetForm(): void {
    this.form.get('quantity')?.setValue(1);
    this.form.get('totalPrice')?.setValue(this.product.currentPrice);
  }

  private quanityChanges(): void {
    this.quantitySubscription = this.form.controls.quantity
      ?.valueChanges.subscribe(value => {
        /** Quick validation */
        if (value < 1) this.form.controls.quantity.setValue(1);
        else if(value > this.product.stock) {
          this.form.controls.quantity.setValue(this.product.stock);
        }

        const totalPrice = this.form.controls.quantity.value * this.product.currentPrice; 
        this.form.controls.totalPrice.setValue(totalPrice);
      });
  }

  private get productAsCartItem(): CartItem {
    return <CartItem>{
      id: this.product.id,
      name: this.product.name,
      unitPrice: this.product.currentPrice,
      thumbnail: this.product.media.images[0].thumbnail,
      ...this.form.value
    };
  }

  updateQuantity(to: 'INCREASE' | 'DECREASE'): void {
    let quantity = this.form.controls.quantity.value;
    (to === 'DECREASE' && quantity > 0)
      ? quantity--
      : (to === 'INCREASE' && quantity < this.product.stock)
      ? quantity++
      : quantity;

    this.form.controls.quantity.setValue(quantity);
  }

  addToCart(e: MouseEvent): void {
    e.stopPropagation();
    
    if (this.form.invalid) return;
    this.cartService.addItemToCart(this.productAsCartItem);
    this.resetForm();
  }

}
