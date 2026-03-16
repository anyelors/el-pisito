import { Component } from '@angular/core';
import { ListInmueble } from "../../../shared/components/list-inmueble/list-inmueble";
import { ContenedorBanners } from "../../../shared/components/contenedor-banners/contenedor-banners";

@Component({
  selector: 'app-favoritos-usuario',
  imports: [ListInmueble, ContenedorBanners],
  templateUrl: './favoritos-usuario.html',
  styleUrl: './favoritos-usuario.css',
})
export class FavoritosUsuario {

}
