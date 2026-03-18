import { Component, inject, signal } from '@angular/core';
import { TematicaService } from '../../../core/services/tematica-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tematica } from '../../../core/models/entities';
import { map, Subscription, switchMap } from 'rxjs';
import { Preloader } from "../../../shared/components/preloader/preloader";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-tematica',
  imports: [Preloader, FormsModule],
  templateUrl: './edit-tematica.html',
  styleUrl: './edit-tematica.css',
})
export class EditTematica {


  private _tematicaService:TematicaService = inject(TematicaService);
  private _router:ActivatedRoute = inject(ActivatedRoute);
  private _routerR:Router = inject(Router);

  cargaCompletada = signal<boolean>(false);
  tematica:Tematica;
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
        switchMap( id => this._tematicaService.getTematica(this.id) )
      ).subscribe({
        next:(datos:Tematica) => {
          this.tematica = datos
          this.cargaCompletada.set(true);
        }
      });

  }


  edit():void{

    this.tematica.activo = Number(this.tematica.activo);
    this.tematica.nombre = this.tematica.nombre.toUpperCase();

    this._tematicaService.updateTematica(this.tematica).subscribe({

      next: (datos) => {},
      complete: () => { this._routerR.navigate(["/admin/list-tematica"]) }

    });




  }

}
