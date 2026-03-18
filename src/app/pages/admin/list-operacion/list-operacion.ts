import { Component, inject, OnInit, signal } from '@angular/core';
import { OperacionService } from '../../../core/services/operacion-service';
import { Operacion } from '../../../core/models/entities';
import { NgClass } from '@angular/common';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-operacion',
  imports: [NgClass, Preloader, RouterLink],
  templateUrl: './list-operacion.html',
  styleUrl: './list-operacion.css',
})
export class ListOperacion implements OnInit {

  private _operacionService:OperacionService = inject(OperacionService);

  cargaCompletada = signal<boolean>(false);
  datos = signal<Operacion[]>([]);

  ngOnInit(): void {
    this.getDatos();
  }

  getDatos():void{

    this._operacionService.getOperaciones().subscribe({
      next: (datos:Operacion[]) => {this.datos.set(datos)},
      complete: () => { this.cargaCompletada.set(true); }
    });

  }

}

