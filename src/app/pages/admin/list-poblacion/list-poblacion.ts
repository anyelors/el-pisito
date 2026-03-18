import { Component, inject, signal } from '@angular/core';
import { PoblacionService } from '../../../core/services/poblacion-service';
import { Router, RouterLink } from '@angular/router';
import { Poblacion } from '../../../core/models/entities';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-list-poblacion',
  imports: [Preloader, NgClass, RouterLink],
  templateUrl: './list-poblacion.html',
  styleUrl: './list-poblacion.css',
})
export class ListPoblacion {

  private _poblacionService:PoblacionService = inject(PoblacionService);
  private _router:Router = inject(Router);

  cargaCompletada = signal<boolean>(false);
  datos = signal<Poblacion[]>([]);

  ngOnInit(): void {
    
    this.getDatos();
  }



  getDatos():void{

    this._poblacionService.getPoblaciones().subscribe({
      next: (datos) => {
        this.datos.set(datos);
      },
      complete: () => { 
        this.cargaCompletada.set(true);
      }
    });

  }

}
