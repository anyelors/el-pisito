import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ProvinciaService } from '../../../core/services/provincia-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Provincia } from '../../../core/models/entities';
import { map, Subscription, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Preloader } from "../../../shared/components/preloader/preloader";

@Component({
  selector: 'app-edit-provincia',
  imports: [FormsModule, Preloader],
  templateUrl: './edit-provincia.html',
  styleUrl: './edit-provincia.css',
})
export class EditProvincia implements OnInit, OnDestroy{

  private _provinciaService:ProvinciaService=inject(ProvinciaService);
  private _router:ActivatedRoute = inject(ActivatedRoute);
  private _routerR:Router = inject(Router);

  cargaCompletada = signal<boolean>(false);

  provincia:Provincia;
  id:number;
  suscripcion:Subscription;

  ngOnInit(): void {
    this.getDatos();
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  getDatos():void{

    this.suscripcion = this._router.paramMap.pipe(
      map( params => this.id = Number(params.get('id'))),
      switchMap( id => this._provinciaService.getProvincia(this.id) )
    ).subscribe({
      next:(datos:Provincia) => {
        this.provincia = datos;
        this.cargaCompletada.set(true);
      }
    });

  }

  edit():void{

    this.provincia.activo = Number(this.provincia.activo);
    this.provincia.nombre = this.provincia.nombre.toUpperCase();

    this._provinciaService.updateProvincia(this.provincia).subscribe({

      next: (datos:Provincia) => {},
      complete: () => {this._routerR.navigate(["/admin/list-provincia"])}

    });

  }

}
