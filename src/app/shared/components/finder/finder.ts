import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoblacionService } from '../../../core/services/poblacion-service';
import { OperacionService } from '../../../core/services/operacion-service';
import { TipoService } from '../../../core/services/tipo-service';
import { ControlCargaService } from '../../../core/services/control-carga-service';
import { Preloader } from "../preloader/preloader";
import { Operacion, Poblacion, Tipo } from '../../../core/models/entities';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finder',
  imports: [FormsModule, Preloader],
  providers: [ControlCargaService],
  templateUrl: './finder.html',
  styleUrl: './finder.css',
})
export class Finder implements OnInit {

  public _controlCargaService: ControlCargaService = inject(ControlCargaService);
  public _poblacionService: PoblacionService = inject(PoblacionService);
  public _operacionService: OperacionService = inject(OperacionService);
  public _tipoService: TipoService = inject(TipoService);
  private _router:Router = inject(Router);

  poblaciones = signal<Poblacion[]>([]);
  operacion = signal<Operacion[]>([]);
  tipo = signal<Tipo[]>([]);

  idTipo: number = 0;
  idPoblacion: number = 0;
  idOperacion: number = 0;

  ngOnInit(): void {
    this._controlCargaService.nFases.set(1);
    this.getDatos();
  }

  getDatos(): void {
    this._poblacionService.getPoblacionesActivas(1).subscribe({
      next: (datos: Poblacion[]) => {
        this.poblaciones.set(datos);
      },
      complete: () => {
        this._controlCargaService.faseCarga();
      }
    });

    this._operacionService.getOperacionesActivas(1).subscribe({
      next: (datos: Operacion[]) => {
        this.operacion.set(datos);
      },
      complete: () => {
        this._controlCargaService.faseCarga();
      }
    });

    this._tipoService.getTiposActivos(1).subscribe({
      next: (datos: Tipo[]) => {
        this.tipo.set(datos);
      },
      complete: () => {
        this._controlCargaService.faseCarga();
      }
    });

  }

  find(): void {
    this._router.navigate(['/finder', this.idTipo, this.idPoblacion, this.idOperacion]);
  }

}
