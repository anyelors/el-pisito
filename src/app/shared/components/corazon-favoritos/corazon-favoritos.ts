import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-corazon-favoritos',
  imports: [],
  templateUrl: './corazon-favoritos.html',
  styleUrl: './corazon-favoritos.css',
})
export class CorazonFavoritos {

  @Input() idInmueble:number;

}
