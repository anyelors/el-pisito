import { Component, inject, input, Input } from '@angular/core';
import { InmuebleImagenDTO } from '../../../core/models/dtos';
import { EurosPipe } from '../../pipes/euros-pipe';
import { BotonAdmin } from "../boton-admin/boton-admin";
import { AuthService } from '../../../core/services/auth-service';
import { CorazonFavoritos } from "../corazon-favoritos/corazon-favoritos";
import { CarouselFicha } from "../carousel-ficha/carousel-ficha";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-ficha-inmueble',
  imports: [EurosPipe, BotonAdmin, CorazonFavoritos, CarouselFicha, RouterLink],
  templateUrl: './ficha-inmueble.html',
  styleUrl: './ficha-inmueble.css',
})

export class FichaInmueble {


  public _authService:AuthService = inject(AuthService);

  @Input() datos:InmuebleImagenDTO;
  @Input() dondeEstoy:string;

}
