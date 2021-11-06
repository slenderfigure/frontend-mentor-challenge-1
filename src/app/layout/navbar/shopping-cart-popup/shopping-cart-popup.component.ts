import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { CartItem } from 'src/app/common/models/shopping-cart-item.model';
import { ShoppingCartService } from 'src/app/common/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-popup',
  templateUrl: './shopping-cart-popup.component.html',
  styleUrls: ['./shopping-cart-popup.component.scss']
})
export class ShoppingCartPopupComponent implements OnInit {
  @ViewChild('shoppingCart', { static: false }) shoppingCart!: ElementRef<HTMLElement>;
  @Output() cartClosed = new EventEmitter<void>();
  cart: CartItem[] = [];
  cartVisible = false;
  loading = false;
  autoCloseTimeout!: any;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.cartService.cartVisibility$.subscribe(visible => {
      if (visible) {
        this.cartVisible = visible;
        this.viewCartItems();
      }
      else this.closeShoppingCart();
    });
  }

  private viewCartItems(): void {
    this.loading = true;
    this.cartService.shoppingCart$.subscribe(
      cart => {
        this.cart = cart;
        this.loading = false;
      },
      error => console.error(error.message)
    );
    this.autoCloseShoppingCart(7000);
  }

  private autoCloseShoppingCart(timeout = 4000): void {
    let counter = 0;

    clearInterval(this.autoCloseTimeout);
    this.autoCloseTimeout = setInterval(() => {
      if ((counter += 1000) === timeout) {
        clearInterval(this.autoCloseTimeout);
        this.closeShoppingCart();
      }
    }, 1000);
  }

  private closeShoppingCart(): void {
    if (!this.cartVisible) return;
    this.shoppingCart.nativeElement.setAttribute('closing', '');
  }

  @HostListener('mouseenter') onMouseenter(): void {
    clearInterval(this.autoCloseTimeout);
  }

  @HostListener('animationend', ['$event'])
  closingAnimationEnd(e: AnimationEvent): void {
    if (e.animationName === 'slideUp') {
      this.cartVisible = false;
      this.cartClosed.emit();
    }
  }
  
  @HostListener('window:click', ['$event']) 
  onOutsideClick(e: MouseEvent): void {
    const target = <HTMLElement>e.target;

    if (!target.closest('.shopping-cart') &&
        !target.closest('.shopping-cart-launch-btn')) {
      this.closeShoppingCart();
    }
  }
  
  @HostListener('window:keyup', ['$event']) 
  onEscKeyPress(e: KeyboardEvent): void {
    if (e.key !== 'Escape') return;
    this.closeShoppingCart();
  }

  onRemoveItem(e: MouseEvent, id: number): void {
    e.stopPropagation();
    this.loading = true;
    this.cartService.removeItemFromCart(id);
  }
}
