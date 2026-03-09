import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-boton-admin',
  imports: [],
  templateUrl: './boton-admin.html',
  styleUrl: './boton-admin.css',
})
export class BotonAdmin {

  @Input() idInmueble:number;

}
