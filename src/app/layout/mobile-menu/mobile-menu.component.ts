import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild
} from '@angular/core';
import { ModalService } from 'src/app/shared/modal/services/modal.service';
import { MobileMenuService } from './service/mobile-menu.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss']
})
export class MobileMenuComponent implements OnInit {
  @ViewChild('mobileMenu', { static: false }) mobileMenu!: ElementRef<HTMLElement>;
  modalId = 'mobile-menu';
  activateMenu = false;

  constructor(
    private menuService: MobileMenuService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.menuService.mobileMenuState$.subscribe(() => {
      this.openModal()
      this.activateMenu = true;
    });
  }
  
  private openModal(): void {
    this.modalService.changeModalState({ id: this.modalId, state: 'OPEN' });
  }

  closeMenu(): void {
    this.modalService.changeModalState({ id: this.modalId, state: 'CLOSE' });
    this.activateMenu = false;
  }


}
