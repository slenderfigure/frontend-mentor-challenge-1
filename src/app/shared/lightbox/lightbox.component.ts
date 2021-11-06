import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { ProductImage } from 'src/app/common/models/product.model';
import { ModalService } from '../modal/services/modal.service';
import { LightboxService } from './services/lightbox.service';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent implements OnInit {
  @Input() images: ProductImage[] = [];
  @ViewChildren('largeImage') 
  _imagesEle!: QueryList<ElementRef<HTMLElement>>;
  imagesEle: HTMLElement[] = [];
  modalId = 'light-box-modal';
  imgNavigationIndex = 0;
  prevImage = 0;
  nextImage = 0;

  constructor(
    private lightboxService: LightboxService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.lightboxService.lightboxState$.subscribe(
      (initialImage) => {
        this.nextImage = initialImage;
        this.imgNavigationIndex = this.nextImage;
        this.modalService.changeModalState({ id: this.modalId, state: 'OPEN' });

        this.imagesEle = this._imagesEle.toArray().map(ele => ele.nativeElement);
      }
    );
  }

  private animateImages(): void {
    const animationClass = (this.nextImage > this.prevImage)
      ? 'next' : 'previous';

    this.resetImagesAnimationState(true);

    this.imagesEle[this.nextImage].classList.add(animationClass);
    this.imagesEle[this.nextImage].style.zIndex = '1';
    this.imagesEle[this.prevImage].style.zIndex = '0';
  }

  private resetImagesAnimationState(removeAllCSSClass = false): void {
    this.imagesEle.forEach(img => {
      img.removeAttribute('style');
      
      (!removeAllCSSClass)
        ? img.classList.remove('next', 'previous')
        : img.classList.remove('initial', 'next', 'previous');
    });
  }

  switchImage(index: number): void {
    this.prevImage = this.nextImage;
    this.nextImage = index;
    this.imgNavigationIndex = index;
    this.animateImages();
  }

  thumbnailKeyup(e: KeyboardEvent, index: number): void {
    if (e.key !== 'Enter') return;
    this.switchImage(index);
  }

  onNavButtonClick(to: 'PREV' | 'NEXT'): void {
    switch (to) {
      case 'PREV':
        this.imgNavigationIndex = (this.imgNavigationIndex > 0) 
          ? this.imgNavigationIndex -= 1
          : 0;
        break;
    
      default:
        this.imgNavigationIndex = (this.imgNavigationIndex < this.images.length - 1) 
          ? this.imgNavigationIndex += 1
          : this.images.length - 1;
        break;
    }
    this.switchImage(this.imgNavigationIndex);
  }

  @HostListener('animationend', ['$event'])
  animationEnd(e: AnimationEvent): void {
    if (e.animationName === 'easeOut') {
      this.resetImagesAnimationState();
    }
  }

  closeLightbox(): void {
    this.modalService.changeModalState({ id: this.modalId, state: 'CLOSE' });
  }
}
