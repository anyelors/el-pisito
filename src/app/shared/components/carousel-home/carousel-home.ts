import { Component, inject, OnInit, signal } from '@angular/core';
import { TematicaBannerCarouselService } from '../../../core/services/tematica-banner-carousel-service';
import { TematicaService } from '../../../core/services/tematica-service';
import { switchMap } from 'rxjs';
import { Tematica } from '../../../core/models/entities';
import { BannerCarouselImagenDTO, ImagenDTO } from '../../../core/models/dtos';
import { Preloader } from "../preloader/preloader";
import { URL_MEDIA } from '../../../core/environments/globals';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-carousel-home',
  imports: [Preloader, NgClass],
  templateUrl: './carousel-home.html',
  styleUrl: './carousel-home.css',
})
export class CarouselHome implements OnInit {

  private _tematicaBannerCarouselService: TematicaBannerCarouselService = inject(TematicaBannerCarouselService);
  private _tematicaService = inject(TematicaService);

  idTematica: number;
  bannersCarousel = signal<BannerCarouselImagenDTO[]>([]);
  cargaCompletada = signal<boolean>(false);
  urlMedia: string=URL_MEDIA;

  ngOnInit(): void {
    this.getDatos();
  }

  getDatos(): void {

    this._tematicaService.getTematicaActual().pipe(
      switchMap((datos: Tematica) => {
        this.idTematica = datos.id!;
        return this._tematicaBannerCarouselService.getBannersCarouselTematica(this.idTematica);
      })
    ).subscribe({
      next: (datos: BannerCarouselImagenDTO[]) => {
        this.bannersCarousel.set(datos);
        this.cargaCompletada.set(true);
      }
    });

  }

}
