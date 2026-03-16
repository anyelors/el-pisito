import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ListInmueble } from "../../../shared/components/list-inmueble/list-inmueble";
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, switchMap } from 'rxjs';
import { InmobiliariaService } from '../../../core/services/inmobiliaria-service';
import { InmobiliariaImagenDTO } from '../../../core/models/dtos';
import { ControlCargaService } from '../../../core/services/control-carga-service';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { URL_MEDIA } from '../../../core/environments/globals';

@Component({
  selector: 'app-inmobiliaria',
  imports: [ListInmueble, Preloader],
  providers: [ControlCargaService],
  templateUrl: './inmobiliaria.html',
  styleUrl: './inmobiliaria.css',
})
export class Inmobiliaria implements OnInit, OnDestroy{

  private _router:ActivatedRoute = inject(ActivatedRoute);
  private _inmobiliariaService = inject(InmobiliariaService);
  public _controlCargaService = inject(ControlCargaService);

  idInmobiliaria:number;
  inmobiliaria:InmobiliariaImagenDTO;
  suscripcion:Subscription;
  url:string;
  alt:string;

  ngOnInit(): void {
    this._controlCargaService.nFases.set(1);
    this.getDatos();
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  getDatos():void {

    this.suscripcion = this._router.paramMap.pipe(
      map( params => this.idInmobiliaria = Number(params.get('id' ))),
      switchMap( id => this._inmobiliariaService.getInmobiliaria(this.idInmobiliaria) )
    ).subscribe({
        next:(datos:InmobiliariaImagenDTO) => {
          this.inmobiliaria = datos;
          this.url = `${URL_MEDIA}${this.inmobiliaria.imagenes[0].url}`;
          this.alt = this.inmobiliaria.imagenes[0].alt;
          this._controlCargaService.faseCarga();
        }
      });
  }
}
