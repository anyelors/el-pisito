import { Component, inject, OnInit, signal } from '@angular/core';
import { ProvinciaService } from '../../../core/services/provincia-service';
import { Provincia } from '../../../core/models/entities';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-provincia',
  imports: [Preloader, NgClass, RouterLink],
  templateUrl: './list-provincia.html',
  styleUrl: './list-provincia.css',
})
export class ListProvincia  implements OnInit {

  private _provinciaService:ProvinciaService = inject(ProvinciaService);

  cargaCompletada = signal<boolean>(false);
  datos = signal<Provincia[]>([]);

  ngOnInit(): void {
    this.getDatos();
  }

  getDatos():void{

    this._provinciaService.getProvincias().subscribe({
      next: (datos:Provincia[]) => {this.datos.set(datos)},
      complete: () => { this.cargaCompletada.set(true); }
    });


  }


}
