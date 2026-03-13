import { Component } from '@angular/core';
import { ListInmueble } from '../../../shared/components/list-inmueble/list-inmueble';
import { Finder } from "../../../shared/components/finder/finder";
import { ContenedorBanners } from "../../../shared/components/contenedor-banners/contenedor-banners";

@Component({
  selector: 'app-home',
  imports: [ListInmueble, Finder, ContenedorBanners],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {



}
