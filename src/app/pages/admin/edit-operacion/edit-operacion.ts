import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { OperacionService } from '../../../core/services/operacion-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Operacion } from '../../../core/models/entities';
import { map, Subscription, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Preloader } from "../../../shared/components/preloader/preloader";

@Component({
  selector: 'app-edit-operacion',
  imports: [FormsModule, Preloader],
  templateUrl: './edit-operacion.html',
  styleUrl: './edit-operacion.css',
})
export class EditOperacion implements OnInit, OnDestroy{

  private _operacionService:OperacionService=inject(OperacionService);
  private _router:ActivatedRoute = inject(ActivatedRoute);
  private _routerR:Router = inject(Router);

  cargaCompletada = signal<boolean>(false);

  operacion:Operacion;
  id:number;
  suscripcion:Subscription;

  ngOnInit(): void {
    this.getDatos();
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  getDatos():void{

    this.suscripcion = this._router.paramMap.pipe(
      map( params => this.id = Number(params.get('id'))),
      switchMap( id => this._operacionService.getOperacion(this.id) )
    ).subscribe({
      next:(datos:Operacion) => {
        this.operacion = datos;
        this.cargaCompletada.set(true);
      }
    });

  }

  edit():void{

    this.operacion.activo = Number(this.operacion.activo);
    this.operacion.nombre = this.operacion.nombre.toUpperCase();

    this._operacionService.updateOperacion(this.operacion).subscribe({

      next: (datos:Operacion) => {},
      complete: () => {this._routerR.navigate(["/admin/list-operacion"])}

    });

  }

}