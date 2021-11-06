import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class MobileMenuService {
  private mobileMenuStateSource = new Subject<void>();
  mobileMenuState$ = this.mobileMenuStateSource.asObservable();

  constructor() { }

  activateMobileMenu(): void {
    this.mobileMenuStateSource.next();
  }
}