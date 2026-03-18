import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { PaginaBannerService } from '../../../core/services/pagina-banner-service';
import { PaginaService } from '../../../core/services/pagina-service';
import { BannerImagenDTO } from '../../../core/models/dtos';
import { Pagina } from '../../../core/models/entities';
import { switchMap } from 'rxjs';
import { Banner } from "../banner/banner";

@Component({
  selector: 'app-contenedor-banners',
  imports: [Banner],
  providers: [],
  templateUrl: './contenedor-banners.html',
  styleUrl: './contenedor-banners.css',
})
export class ContenedorBanners implements OnInit {

  private _paginaBannerService = inject(PaginaBannerService);
  private _paginaService = inject(PaginaService);
   
  cargaCompletada = signal<boolean>(false);
  banners = signal<BannerImagenDTO[]>([]);
  @Input() dondeEstoy: string;
  idPagina: number;
  

   ngOnInit(): void {
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
        this.cargaCompletada.set(true);
      }
    });

  }

}
