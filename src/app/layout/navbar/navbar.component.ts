import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/common/services/shopping-cart.service';
import { MobileMenuService } from '../mobile-menu/service/mobile-menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  itemCount: number | string = 0;
  cartVisible = false;

  constructor(
    private menuService: MobileMenuService,
    private cartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.cartService.itemCount$.subscribe(count => {
      this.itemCount = count < 100 ? count : '99+';
    });
  }

  openSideMenu(): void {
    this.menuService.activateMobileMenu();
  }

  onViewCart(): void {
    this.cartVisible = !this.cartVisible;
    this.cartService.toggleCart(this.cartVisible);
  }

  cartClosed(): void {
    this.cartVisible = false;
  }
}
