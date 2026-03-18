import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TipoService } from '../../../core/services/tipo-service';
import { Tipo } from '../../../core/models/entities';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-tipo',
  imports: [FormsModule],
  templateUrl: './add-tipo.html',
  styleUrl: './add-tipo.css',
})
export class AddTipo {

    private _tipoService:TipoService = inject(TipoService);
    private _router:Router = inject(Router);

    tipo:Tipo={

      nombre:""

    }

    add():void{

      this.tipo.nombre = this.tipo.nombre.toUpperCase();

      this._tipoService.addTipo(this.tipo).subscribe({
        next: (datos:Tipo) => {},
        complete: () => { this._router.navigate(["/admin/list-tipo"]); }
      });

    }

}
