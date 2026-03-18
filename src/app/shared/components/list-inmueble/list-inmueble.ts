import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { InmuebleService } from '../../../core/services/inmueble-service';
import { InmuebleImagenDTO } from '../../../core/models/dtos';
import { FavoritosService } from '../../../core/services/favoritos-service';
import { AuthService } from '../../../core/services/auth-service';
import { FinderData } from '../../../core/models/auxiliares';
import { Preloader } from "../preloader/preloader";
import { FichaInmueble } from "../ficha-inmueble/ficha-inmueble";
import { NoInmueble } from "../no-inmueble/no-inmueble";

@Component({
  selector: 'app-list-inmueble',
  imports: [Preloader, FichaInmueble, NoInmueble],
  providers: [],
  templateUrl: './list-inmueble.html',
  styleUrl: './list-inmueble.css'
})
export class ListInmueble implements OnInit {

  private _inmuebleService: InmuebleService = inject(InmuebleService);
  private _favoritoService: FavoritosService = inject(FavoritosService);
  private _authService: AuthService = inject(AuthService);

  cargaCompletada = signal<boolean>(false);
  usuarioId: number | undefined;
  inmuebles = signal<InmuebleImagenDTO[]>([]);
  @Input() dondeEstoy: string;
  @Input() finderData: FinderData;
  @Input() idInmobiliaria: number;

  ngOnInit(): void {

    this._authService.getMe();
    this.usuarioId = this._authService.usuario()?.id;

    if (this.dondeEstoy == "home") {
      this.getInmueblesPortada();
    } else if (this.dondeEstoy == "favoritos") {
      this.getInmueblesFavoritos();
    } else if (this.dondeEstoy == "inmobiliaria") {
      this.getInmueblesInmobiliaria();
    } else if (this.dondeEstoy == "finder") {
      this.getInmueblesFinder();
    }

  }

  getInmueblesPortada(): void {

    this._inmuebleService.getInmueblesPortada().subscribe({
      next: (datos: InmuebleImagenDTO[]) => {
        this.inmuebles.set(datos);
        this.cargaCompletada.set(true);
      }
    });

  }

  getInmueblesFavoritos(): void {

    if (this.usuarioId) {
      this._favoritoService.getFavoritosDatos(this.usuarioId).subscribe({
        next: (datos: InmuebleImagenDTO[]) => {
          this.inmuebles.set(datos);
          this.cargaCompletada.set(true);
        }
      })
    } else {
      this._authService.logout();
    }

  }

  getInmueblesInmobiliaria(): void {

    this._inmuebleService.getInmueblesInmobiliaria(this.idInmobiliaria).subscribe({
      next: (datos: InmuebleImagenDTO[]) => {
        this.inmuebles.set(datos);
        this.cargaCompletada.set(true);
      }
    });

  }

  getInmueblesFinder(): void {

    if (this.finderData.idTipo != 0 && this.finderData.idPoblacion != 0 && this.finderData.idOperacion != 0) {
      this._inmuebleService.getInmueblesFinder(this.finderData.idTipo, this.finderData.idPoblacion, this.finderData.idOperacion).subscribe({
        next: (datos: InmuebleImagenDTO[]) => {
          this.inmuebles.set(datos);
          this.cargaCompletada.set(true);
        }
      });
    }

  }

}
