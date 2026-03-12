import { Injectable, signal } from '@angular/core';
import { ModalData } from '../models/auxiliares';

@Injectable({
  providedIn: 'root',
})
export class ModalService {

  modalData = signal<ModalData | null>(null);
  isOpen = signal(false);
  
  open(data:ModalData):void{
    this.modalData.set(data);
    this.isOpen.set(true);
  }

  close():void{
    this.modalData.set(null);
    this.isOpen.set(false);
  }
  
}
