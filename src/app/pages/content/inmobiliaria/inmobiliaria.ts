import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ListInmueble } from "../../../shared/components/list-inmueble/list-inmueble";
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inmobiliaria',
  imports: [ListInmueble],
  templateUrl: './inmobiliaria.html',
  styleUrl: './inmobiliaria.css',
})
export class Inmobiliaria implements OnInit, OnDestroy{

    
  private _router:ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.getDatos();
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  idInmobiliaria:number;
  suscripcion:Subscription;

  getDatos():void {

    this.suscripcion = this._router.params.subscribe({
      next:(params) => {
        this.idInmobiliaria = params['id'];
      }
    });

  }

}
