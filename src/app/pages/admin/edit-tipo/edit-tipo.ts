import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { TipoService } from '../../../core/services/tipo-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tipo } from '../../../core/models/entities';
import { map, Subscription, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Preloader } from "../../../shared/components/preloader/preloader";

@Component({
  selector: 'app-edit-tipo',
  imports: [FormsModule, Preloader],
  templateUrl: './edit-tipo.html',
  styleUrl: './edit-tipo.css',
})
export class EditTipo implements OnInit, OnDestroy{

  private _tipoService:TipoService=inject(TipoService);
  private _router:ActivatedRoute = inject(ActivatedRoute);
  private _routerR:Router = inject(Router);

  cargaCompletada = signal<boolean>(false);

  tipo:Tipo;
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
      switchMap( id => this._tipoService.getTipo(this.id) )
    ).subscribe({
      next:(datos:Tipo) => {
        this.tipo = datos;
        this.cargaCompletada.set(true);
      }
    });

  }

  edit():void{

    this.tipo.activo = Number(this.tipo.activo);
    this.tipo.nombre = this.tipo.nombre.toUpperCase();

    this._tipoService.updateTipo(this.tipo).subscribe({

      next: (datos:Tipo) => {},
      complete: () => {this._routerR.navigate(["/admin/list-tipo"])}

    });

  }

}

