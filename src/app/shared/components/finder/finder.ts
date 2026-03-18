import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoblacionService } from '../../../core/services/poblacion-service';
import { OperacionService } from '../../../core/services/operacion-service';
import { TipoService } from '../../../core/services/tipo-service';
import { Preloader } from "../preloader/preloader";
import { Operacion, Poblacion, Tipo } from '../../../core/models/entities';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-finder',
  imports: [FormsModule, Preloader],
  providers: [],
  templateUrl: './finder.html',
  styleUrl: './finder.css',
})
export class Finder implements OnInit {

  public _poblacionService: PoblacionService = inject(PoblacionService);
  public _operacionService: OperacionService = inject(OperacionService);
  public _tipoService: TipoService = inject(TipoService);
  private _router:Router = inject(Router);

  cargaCompletada = signal<boolean>(false);
  poblaciones = signal<Poblacion[]>([]);
  operacion = signal<Operacion[]>([]);
  tipo = signal<Tipo[]>([]);

  idTipo: number = 0;
  idPoblacion: number = 0;
  idOperacion: number = 0;

  ngOnInit(): void {
    this.getDatos();
  }

  getDatos(): void {

    forkJoin({
      getPoblaciones: this._poblacionService.getPoblacionesActivas(1),
      getOperaciones: this._operacionService.getOperacionesActivas(1),
      getTipos: this._tipoService.getTiposActivos(1),
    }).subscribe({
      next:(result) => {
        this.poblaciones.set(result.getPoblaciones);
        this.operacion.set(result.getOperaciones);
        this.tipo.set(result.getTipos);
      },
      complete: () => {this.cargaCompletada.set(true);}
    });

  }

  find(): void {
    this._router.navigate(['/finder', this.idTipo, this.idPoblacion, this.idOperacion]);
  }

}
