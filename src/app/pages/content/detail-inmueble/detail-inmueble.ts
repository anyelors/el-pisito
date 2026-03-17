import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { AuthService } from '../../../core/services/auth-service';
import { BotonAdmin } from "../../../shared/components/boton-admin/boton-admin";
import { CarouselFicha } from "../../../shared/components/carousel-ficha/carousel-ficha";
import { EurosPipe } from "../../../shared/pipes/euros-pipe";
import { ParentesisPipe } from "../../../shared/pipes/parentesis-pipe";
import { MetrosCuadradosPipe } from "../../../shared/pipes/metros-cuadrados-pipe";
import { MinusculasPipe } from "../../../shared/pipes/minusculas-pipe";
import { PlazasPipe } from "../../../shared/pipes/plazas-pipe";
import { SiNoPipe } from "../../../shared/pipes/si-no-pipe";
import { AmuebladoPipe } from "../../../shared/pipes/amueblado-pipe";
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, switchMap } from 'rxjs';
import { InmuebleService } from '../../../core/services/inmueble-service';
import { InmuebleImagenDTO } from '../../../core/models/dtos';
import { CorazonFavoritos } from "../../../shared/components/corazon-favoritos/corazon-favoritos";
import { ContenedorBanners } from "../../../shared/components/contenedor-banners/contenedor-banners";

@Component({
  selector: 'app-detail-inmueble',
  imports: [Preloader, BotonAdmin, CarouselFicha, EurosPipe, ParentesisPipe, MetrosCuadradosPipe, MinusculasPipe, PlazasPipe, SiNoPipe, AmuebladoPipe, CorazonFavoritos, ContenedorBanners],
  templateUrl: './detail-inmueble.html',
  styleUrl: './detail-inmueble.css',
})
export class DetailInmueble implements OnInit, OnDestroy{
  
  private _router:ActivatedRoute = inject(ActivatedRoute);
  public _authService:AuthService = inject(AuthService);
  private _inmuebleService:InmuebleService = inject(InmuebleService);

  cargaCompletada = signal<boolean>(false);
  idInmueble:number;
  datos:InmuebleImagenDTO;
  suscripcion:Subscription;
  url:string;

  ngOnInit(): void {
    this.getDatos();
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  
  getDatos():void {
  
      this.suscripcion = this._router.paramMap.pipe(
        map( params => this.idInmueble = Number(params.get('id' ))),
        switchMap( id => this._inmuebleService.getInmueble(this.idInmueble) )
      ).subscribe({
          next:(datos:InmuebleImagenDTO) => {
            this.datos = datos;
            this.cargaCompletada.set(true);
          }
        });
    }

}
