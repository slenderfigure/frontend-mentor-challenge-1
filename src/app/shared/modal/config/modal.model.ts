export type ModalState = 'OPEN' | 'CLOSE';

export interface ModalModel {
  id: string | number,
  state: ModalState
}