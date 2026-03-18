import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PoblacionService } from '../../../core/services/poblacion-service';
import { ProvinciaService } from '../../../core/services/provincia-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Poblacion, Provincia } from '../../../core/models/entities';
import { forkJoin, map, Subscription, switchMap } from 'rxjs';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-poblacion',
  imports: [Preloader, NgClass, FormsModule],
  templateUrl: './edit-poblacion.html',
  styleUrl: './edit-poblacion.css',
})
export class EditPoblacion  implements OnInit, OnDestroy{

  private _poblacionService:PoblacionService=inject(PoblacionService);
  private _provinciaService:ProvinciaService=inject(ProvinciaService);
  private _router:Router=inject(Router);
  private _route:ActivatedRoute = inject(ActivatedRoute);

  cargaCompletada = signal<boolean>(false);
  provincias = signal<Array<Provincia>>([]);
  poblacion:Poblacion;
  id:number;
  suscripcion:Subscription;

  ngOnInit(): void {
    this.getDatos();
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  getDatos():void{

    this.suscripcion = this._route.paramMap.pipe( 
      map( params => this.id = Number(params.get("id"))),
      switchMap(id => {
        return forkJoin({
          getPoblacion: this._poblacionService.getPoblacion(this.id),
          getProvincias: this._provinciaService.getProvincias(),
        })
      })
    ).subscribe({
      next: (datos) => {
        this.poblacion = datos.getPoblacion;
        this.provincias.set(datos.getProvincias);
        this.cargaCompletada.set(true);
      }
    });

  }/* fin getDatos */


  edit():void{

    this.poblacion.activo = Number(this.poblacion.activo);
    this.poblacion.nombre = this.poblacion.nombre.toUpperCase();

    this._poblacionService.updatePoblacion(this.poblacion).subscribe({
      next: (datos) => {},
      complete: () => { this._router.navigate(["/admin/list-poblacion"]) }
    });

  }

}

