import { Component, inject, OnInit, signal } from '@angular/core';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { InmobiliariaService } from '../../../core/services/inmobiliaria-service';
import { InmobiliariaImagenDTO } from '../../../core/models/dtos';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { URL_MEDIA } from '../../../core/environments/globals';

@Component({
  selector: 'app-list-inmobiliaria',
  imports: [Preloader, NgClass, RouterLink],
  templateUrl: './list-inmobiliaria.html',
  styleUrl: './list-inmobiliaria.css',
})
export class ListInmobiliaria implements OnInit {

  private _inmobiliariaService:InmobiliariaService = inject(InmobiliariaService);

  cargaCompletada = signal<boolean>(false);
  datos = signal<Array<InmobiliariaImagenDTO>>([]);
  url:string = URL_MEDIA;

  ngOnInit(): void {
    this.getDatos();
  }

  getDatos():void{

    this._inmobiliariaService.getInmobiliarias().subscribe({
      next: (datos) => {
        this.datos.set(datos);
        this.cargaCompletada.set(true);
      }
    });

  }

}

