import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LightboxService {

  private lightboxStateSource = new Subject<number>();
  lightboxState$ = this.lightboxStateSource.asObservable();

  constructor() {}

  activateLightbox(activeImage: number): void {
    this.lightboxStateSource.next(activeImage);
  }

}