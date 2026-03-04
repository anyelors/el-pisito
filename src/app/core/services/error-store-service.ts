import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorStoreService {

  errorStatus = signal<number>(404);
  errorMensaje = signal<string>('Recurso no encontrado');

  setErrorStatus(status:number):void{
    this.errorStatus.set(status);
  }

  setErrorMensaje(mensaje:string):void{
    this.errorMensaje.set(mensaje);
  }
  
}
