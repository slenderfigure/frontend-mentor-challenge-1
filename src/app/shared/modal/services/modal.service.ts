import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ModalModel } from '../config/modal.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalStateSource = new Subject<ModalModel>();
  modalState$ = this.modalStateSource.asObservable();

  constructor() { }

  changeModalState(modal: ModalModel): void {
    this.modalStateSource.next(modal);
  }
}
