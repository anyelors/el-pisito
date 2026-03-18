import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ListInmueble } from "../../../shared/components/list-inmueble/list-inmueble";
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, switchMap } from 'rxjs';
import { InmobiliariaService } from '../../../core/services/inmobiliaria-service';
import { InmobiliariaImagenDTO } from '../../../core/models/dtos';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { URL_MEDIA } from '../../../core/environments/globals';

@Component({
  selector: 'app-inmobiliaria',
  imports: [ListInmueble, Preloader],
  providers: [],
  templateUrl: './inmobiliaria.html',
  styleUrl: './inmobiliaria.css',
})
export class Inmobiliaria implements OnInit, OnDestroy{

  private _router:ActivatedRoute = inject(ActivatedRoute);
  private _inmobiliariaService = inject(InmobiliariaService);

  cargaCompletada = signal<boolean>(false);
  idInmobiliaria:number;
  inmobiliaria:InmobiliariaImagenDTO;
  suscripcion:Subscription;
  url:string;
  alt:string;

  ngOnInit(): void {
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
          this.cargaCompletada.set(true);
        }
      });
  }
  
}
