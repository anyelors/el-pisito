import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Provincia } from '../../../core/models/entities';
import { ProvinciaService } from '../../../core/services/provincia-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-provincia',
  imports: [FormsModule],
  templateUrl: './add-provincia.html',
  styleUrl: './add-provincia.css',
})
export class AddProvincia {

    private _provinciaService:ProvinciaService = inject(ProvinciaService);
    private _router:Router = inject(Router);

    provincia:Provincia={

      nombre:""

    }

    add():void{

      this.provincia.nombre = this.provincia.nombre.toUpperCase();

      this._provinciaService.addProvincia(this.provincia).subscribe({
        next: (datos) => {},
        complete: () => { this._router.navigate(["/admin/list-provincia"]); }
      });

    }

}
