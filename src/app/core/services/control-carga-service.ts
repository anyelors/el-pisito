import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ControlCargaService {

  //----------------------------------------
  nFases = signal<number>(0);
  cargaCompletada = signal<boolean>(false);
  fasesCargadas = signal<number>(0);

  reset():void{
    this.nFases.set(0);
    this.cargaCompletada.set(false);
    this.fasesCargadas.set(0);
  }

  faseCarga():void{

    this.fasesCargadas.update((value) => value + 1);

    if (this.fasesCargadas() == this.nFases()){
      this.cargaCompletada.set(true);
    }

  }
  
}
