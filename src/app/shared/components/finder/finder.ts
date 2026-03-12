import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoblacionService } from '../../../core/services/poblacion-service';
import { OperacionService } from '../../../core/services/operacion-service';
import { TipoService } from '../../../core/services/tipo-service';
import { ControlCargaService } from '../../../core/services/control-carga-service';
import { Preloader } from "../preloader/preloader";
import { Operacion, Poblacion, Tipo } from '../../../core/models/entities';

@Component({
  selector: 'app-finder',
  imports: [FormsModule, Preloader],
  providers: [ControlCargaService],
  templateUrl: './finder.html',
  styleUrl: './finder.css',
})
export class Finder implements OnInit {
 
  public _controlCargaService: ControlCargaService = inject(ControlCargaService);
  public _poblacionService:PoblacionService = inject(PoblacionService);
  public _operacionService:OperacionService = inject(OperacionService);
  public _tipoService:TipoService = inject(TipoService);

  poblaciones = signal<Poblacion[]>([]);
  operacion = signal<Operacion[]>([]);
  tipo = signal<Tipo[]>([]);

  ngOnInit(): void {
    this._controlCargaService.nFases.set(1);

    this.getPoblaciones();
  }

    getPoblaciones(): void {
    this._poblacionService.getPoblaciones().subscribe({
      next: (datos:Poblacion[]) => {
        console.log(datos);
        this.poblaciones.set(datos);
      },
      complete: () => {
        this._controlCargaService.faseCarga();
      }
    });
  }

  find(): void {
    console.log('find');
  }

}
