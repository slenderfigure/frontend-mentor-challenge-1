import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ImageViewerComponent } from './pages/product-details/image-viewer/image-viewer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { MobileMenuComponent } from './layout/mobile-menu/mobile-menu.component';
import { ShoppingCartPopupComponent } from './layout/navbar/shopping-cart-popup/shopping-cart-popup.component';
import { ModalComponent } from './shared/modal/modal.component';
import { LightboxComponent } from './shared/lightbox/lightbox.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponent,
    ImageViewerComponent,
    NavbarComponent,
    MobileMenuComponent,
    ShoppingCartPopupComponent,
    ModalComponent,
    LightboxComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
