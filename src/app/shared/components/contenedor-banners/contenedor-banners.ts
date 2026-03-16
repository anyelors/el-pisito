import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ControlCargaService } from '../../../core/services/control-carga-service';
import { PaginaBannerService } from '../../../core/services/pagina-banner-service';
import { PaginaService } from '../../../core/services/pagina-service';
import { BannerImagenDTO } from '../../../core/models/dtos';
import { Pagina } from '../../../core/models/entities';
import { switchMap } from 'rxjs';
import { Banner } from "../banner/banner";

@Component({
  selector: 'app-contenedor-banners',
  imports: [Banner],
  providers: [ControlCargaService],
  templateUrl: './contenedor-banners.html',
  styleUrl: './contenedor-banners.css',
})
export class ContenedorBanners implements OnInit {

  public _controlCargaService: ControlCargaService = inject(ControlCargaService);
  private _paginaBannerService = inject(PaginaBannerService);
  private _paginaService = inject(PaginaService);
   
  @Input() dondeEstoy: string;
  idPagina: number;
  banners = signal<BannerImagenDTO[]>([]);

   ngOnInit(): void {
    this._controlCargaService.nFases.set(1);
    this.getDatos();
   }

   getDatos():void {

    this._paginaService.getPaginaByNombre(this.dondeEstoy).pipe(
      switchMap( (datos:Pagina) => {
        this.idPagina = datos.id!;
        return this._paginaBannerService.getBannersPagina(this.idPagina);
      })
    ).subscribe({
      next:(datos:BannerImagenDTO[]) => {
        this.banners.set(datos);
      },
      complete: () => {
        this._controlCargaService.faseCarga();
      }
    });

  }

}
