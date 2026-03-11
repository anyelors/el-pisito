import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalData } from '../models/auxiliares';

@Injectable({
  providedIn: 'root',
})
export class ModalService {

  private modalSubject:BehaviorSubject<ModalData> = new BehaviorSubject<ModalData>({});
  modalState$ = this.modalSubject.asObservable();

  accionModal(datos:ModalData):void{
    this.modalSubject.next(datos);
  }
  
}
