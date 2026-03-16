import { Component, inject, OnInit } from '@angular/core';
import { TematicaBannerCarouselService } from '../../../core/services/tematica-banner-carousel-service';
import { TematicaService } from '../../../core/services/tematica-service';
import { ControlCargaService } from '../../../core/services/control-carga-service';

@Component({
  selector: 'app-carousel-home',
  imports: [],
  templateUrl: './carousel-home.html',
  styleUrl: './carousel-home.css',
})
export class CarouselHome implements OnInit {

  private _tematicaBannerCarouselService:TematicaBannerCarouselService = inject(TematicaBannerCarouselService);
  private _tematicaService = inject(TematicaService);
  public _controlCargaService: ControlCargaService = inject(ControlCargaService);

  ngOnInit(): void {
    this._controlCargaService.nFases.set(1);
    this.getDatos();
  }

  getDatos(): void {
    this._tematicaService.getTematicaActual().subscribe(tematica => {
      if (tematica) {
        this._tematicaBannerCarouselService.getBannersCarouselTematica(tematica.id!).subscribe(banners => {
          // Aquí puedes asignar los banners a una variable para usarlos en tu componente
          console.log(banners);
        });
      }
    });
  }

}
