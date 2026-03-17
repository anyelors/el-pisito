import { Component, inject, OnInit, signal } from '@angular/core';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { FormsModule } from '@angular/forms';
import { TematicaService } from '../../../core/services/tematica-service';
import { Tematica } from '../../../core/models/entities';
import { TematicaBannerCarouselService } from '../../../core/services/tematica-banner-carousel-service';
import { BannerCarouselImagenDTO } from '../../../core/models/dtos';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-tematica',
  imports: [Preloader, FormsModule, NgClass, RouterLink],
  templateUrl: './list-tematica.html',
  styleUrl: './list-tematica.css',
})
export class ListTematica implements OnInit{

  private _tematicaService:TematicaService = inject(TematicaService);
  private _tematicaBannerCarouselService:TematicaBannerCarouselService = inject(TematicaBannerCarouselService);

  datos = signal<Tematica[]>([]);
  cargaCompletada = signal<boolean>(false);
  cargaCompletadaTable = signal<boolean>(false);
  

  ngOnInit(): void {
    this.getDatos();
  }

  getDatos():void{

    this._tematicaService.getTematicas().subscribe({

      next: (datos:Tematica[]) => {
        this.datos.set(datos);

        for(let laTematica of this.datos()){

          this._tematicaBannerCarouselService.getBannersCarouselTematica(laTematica.id!).subscribe({

            next:(datosBC:BannerCarouselImagenDTO[])=>{
              laTematica.numeroBanners = datosBC.length;//dejamos en cada objeto tematica el número de banners que tiene
            },
            complete: () => { this.cargaCompletadaTable.set(true); }
          })

        }

      },
      complete: () => { this.cargaCompletada.set(true); }
    });


  }

}

