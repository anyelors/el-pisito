import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ListInmueble } from "../../../shared/components/list-inmueble/list-inmueble";
import { ActivatedRoute } from '@angular/router';
import { FinderData } from '../../../core/models/auxiliares';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inmuebles-finder',
  imports: [ListInmueble],
  templateUrl: './inmuebles-finder.html',
  styleUrl: './inmuebles-finder.css',
})
export class InmueblesFinder implements OnInit, OnDestroy {
  
  private _router:ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.getDatos();
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  datosFinder:FinderData = {
    idTipo: 0,
    idPoblacion: 0,
    idOperacion: 0
  }

  suscripcion:Subscription;

  getDatos():void {

    this.suscripcion = this._router.params.subscribe({
      next:(params) => {
        this.datosFinder.idTipo = params['idTipo'];
        this.datosFinder.idPoblacion = params['idPoblacion'];
        this.datosFinder.idOperacion = params['idOperacion'];
      }
    });

  }

}
