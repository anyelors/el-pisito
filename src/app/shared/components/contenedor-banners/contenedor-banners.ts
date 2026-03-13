import { Component, inject, Input, OnInit } from '@angular/core';
import { ControlCargaService } from '../../../core/services/control-carga-service';
import { PaginaBannerService } from '../../../core/services/pagina-banner-service';
import { PaginaService } from '../../../core/services/pagina-service';
import { BannerImagenDTO } from '../../../core/models/dtos';

@Component({
  selector: 'app-contenedor-banners',
  imports: [],
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
  banners: BannerImagenDTO[];

   ngOnInit(): void {
    this._controlCargaService.nFases.set(2);

    this.getDatos();
   }

    getDatos(): void {

      this._paginaService.getPaginaByNombre(this.dondeEstoy).subscribe({
        next: (pagina) => {
          this.idPagina = pagina.id!;
        },
        complete: () => {
          this._paginaBannerService.getBannersPagina(this.idPagina).subscribe({
            next: (resp) => {
              this.banners = resp;
            },
            complete: () => {
              this._controlCargaService.faseCarga();
            }
          });
        }
      });
    
    }

}
