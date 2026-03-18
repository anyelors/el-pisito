import { Component, inject, OnInit, signal } from '@angular/core';
import { PoblacionService } from '../../../core/services/poblacion-service';
import { Router } from '@angular/router';
import { Poblacion, Provincia } from '../../../core/models/entities';
import { ProvinciaService } from '../../../core/services/provincia-service';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-add-poblacion',
  imports: [Preloader, FormsModule, NgClass],
  templateUrl: './add-poblacion.html',
  styleUrl: './add-poblacion.css',
})
export class AddPoblacion  implements OnInit{

  private _poblacionService:PoblacionService = inject(PoblacionService);
  private _provinciaService:ProvinciaService = inject(ProvinciaService);
  private _router:Router = inject(Router);

  cargaCompletada = signal<boolean>(false);
  provincias = signal<Array<Provincia>>([]);

  poblacion:Poblacion={
    nombre:"",
    cp:"",
    provincia:{
      nombre:""
    }
  }

  ngOnInit(): void {
    this.getDatos();
  }



  getDatos():void{
    this._provinciaService.getProvincias().subscribe({
      next: (datos:Provincia[]) => { 
        this.provincias.set(datos);
      },
      complete: () => { 
        this.cargaCompletada.set(true);
       }
    });
  }

  add():void{

    this.poblacion.nombre = this.poblacion.nombre.toUpperCase();

    this._poblacionService.addPoblacion(this.poblacion).subscribe({
      next: (datos) => {},
      complete: () => {
        this._router.navigate(["/admin/list-poblacion"]);
      }
    });


  }

}

