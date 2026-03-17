import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TematicaService } from '../../../core/services/tematica-service';
import { Router } from '@angular/router';
import { Tematica } from '../../../core/models/entities';


@Component({
  selector: 'app-add-tematica',
  imports: [FormsModule],
  templateUrl: './add-tematica.html',
  styleUrl: './add-tematica.css',
})
export class AddTematica {

  private _tematicaService:TematicaService = inject(TematicaService);
  private _router:Router = inject(Router);

  tematica:Tematica={

    nombre:""

  }


  add():void{

    this.tematica.nombre = this.tematica.nombre.toUpperCase();

    this._tematicaService.addTematica(this.tematica).subscribe({

      next: (datos:Tematica) => {}, //Devuelve el objeto creado
      complete: () => {
        this._router.navigate(["/admin/list-tematica"])
      }
    });

    
  }

}
