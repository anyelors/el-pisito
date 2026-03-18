import { Component, inject, OnInit, signal } from '@angular/core';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { FormsModule } from '@angular/forms';
import { TematicaService } from '../../../core/services/tematica-service';
import { TematicaDTO } from '../../../core/models/dtos';
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

  datos = signal<TematicaDTO[]>([]);
  cargaCompletada = signal<boolean>(false);

  ngOnInit(): void {
    this.getDatos();
  }

  getDatos():void{

    this._tematicaService.getTematicas().subscribe({

      next: (datos:TematicaDTO[]) => {
        this.datos.set(datos);
      },
      complete: () => { this.cargaCompletada.set(true); }
    });


  }

}

