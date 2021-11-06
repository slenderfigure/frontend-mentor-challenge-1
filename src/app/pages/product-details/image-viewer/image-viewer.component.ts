import { Component, Input, OnInit } from '@angular/core';
import { ProductImage } from 'src/app/common/models/product.model';
import { LightboxService } from 'src/app/shared/lightbox/services/lightbox.service';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {
  @Input() images: ProductImage[] = [];
  activeImage = 0;

  constructor(private lightboxService: LightboxService) { }

  ngOnInit(): void {
  }

  get activeImageOriginalUrl(): string {
    return this.images[this.activeImage].original;
  }

  openLightbox(): void {
    this.lightboxService.activateLightbox(this.activeImage);
  }
  
  largeImageKeyup(e: KeyboardEvent): void {
    if (e.key !== 'Enter') return;
    this.openLightbox();
  }

  thumbnailKeyup(e: KeyboardEvent, index: number): void {
    if (e.key !== 'Enter') return;
    this.switchImage(index);
  }

  switchImage(index: number): void {
    this.activeImage = index;
  }

  onNavButtonClick(to: 'PREV' | 'NEXT'): void {
    switch (to) {
      case 'PREV':
        this.activeImage = (this.activeImage > 0) 
          ? this.activeImage -= 1
          : 0;
        break;
    
      default:
        this.activeImage = (this.activeImage < this.images.length - 1) 
          ? this.activeImage += 1
          : this.images.length - 1;
        break;
    }
    this.switchImage(this.activeImage);
  }
}
