import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { ModalState } from './config/modal.model';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input('id') modalId!: number | string;
  @ViewChild('modalOverlay', { static: false }) modal!: ElementRef<HTMLElement>;
  modalState: ModalState = 'CLOSE';

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.modalService.modalState$.subscribe(modal => {
      if (modal.id === this.modalId) this.toggleModal(modal.state);
    });
  }

  private toggleModal(state: ModalState): void {
    (state === 'OPEN') ? this.openModal() : this.closeModal();
  }

  private openModal(): void {
    document.body.setAttribute('active-modal', '');
    this.modalState = 'OPEN';
  }
  
  private closeModal(): void {
    this.modal.nativeElement.setAttribute('closing', '');
    document.body.removeAttribute('active-modal');
  }

  @HostListener('animationend', ['$event'])
  closingAnimationEnd(e: AnimationEvent): void {
    if (e.animationName === 'easeOut') this.modalState = 'CLOSE';
  }

  @HostListener('window:click', ['$event']) 
  onOutsideClick(e: MouseEvent): void {
    if (this.modalState === 'CLOSE') return;

    e.stopPropagation();

    const target = <HTMLElement>e.target;
    const clickedOutside = target === this.modal.nativeElement;

    if (clickedOutside) {
      this.modalService.changeModalState({ id: this.modalId, state: 'CLOSE' });
    }
  }
  
  @HostListener('window:keyup', ['$event']) 
  onEscKeyPress(e: KeyboardEvent): void {
    if (this.modalState === 'CLOSE' || e.key !== 'Escape') return;
    this.modalService.changeModalState({ id: this.modalId, state: 'CLOSE' });
  }

}

