import { Component, Input, OnInit } from '@angular/core';
import { InmuebleImagenDTO } from '../../../core/models/dtos';
import { URL_MEDIA } from '../../../core/environments/globals';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-gadget-logo-inmobiliaria',
  imports: [RouterLink],
  templateUrl: './gadget-logo-inmobiliaria.html',
  styleUrl: './gadget-logo-inmobiliaria.css',
})
export class GadgetLogoInmobiliaria implements OnInit {

  @Input() datosInmueble:InmuebleImagenDTO;
  url:string;
  alt:string;
  id:number;

 ngOnInit(): void {
    console.log(this.datosInmueble);

    this.url = `${URL_MEDIA}${this.datosInmueble.inmobiliaria.imagenes[0].url}`;
    this.alt = `${this.datosInmueble.inmobiliaria.imagenes[0].alt}`;
    this.id = this.datosInmueble.inmobiliaria.id;
  }

}
