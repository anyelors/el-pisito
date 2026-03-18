import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OperacionService } from '../../../core/services/operacion-service';
import { Router } from '@angular/router';
import { Operacion } from '../../../core/models/entities';

@Component({
  selector: 'app-add-operacion',
  imports: [FormsModule],
  templateUrl: './add-operacion.html',
  styleUrl: './add-operacion.css',
})
export class AddOperacion {

    private _operacionService:OperacionService = inject(OperacionService);
    private _router:Router = inject(Router);

    operacion:Operacion={

      nombre:""

    }

    add():void{

      this.operacion.nombre = this.operacion.nombre.toUpperCase();

      this._operacionService.addOperacion(this.operacion).subscribe({
        next: (datos:Operacion) => {},
        complete: () => { this._router.navigate(["/admin/list-operacion"]); }
      });

    }

}
