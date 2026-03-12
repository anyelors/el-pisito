import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../../core/services/auth-service';
import { FavoritosService } from '../../../core/services/favoritos-service';
import { InmuebleIdDTO, InmuebleImagenDTO } from '../../../core/models/dtos';
import { ControlCargaService } from '../../../core/services/control-carga-service';
import { ModalData } from '../../../core/models/auxiliares';
import { ModalService } from '../../../core/services/modal-service';

@Component({
  selector: 'app-corazon-favoritos',
  imports: [RouterLink],
  providers: [ControlCargaService],
  templateUrl: './corazon-favoritos.html',
  styleUrl: './corazon-favoritos.css',
})
export class CorazonFavoritos implements OnInit {
    
  public _authService:AuthService = inject(AuthService);
  private _favoritosService:FavoritosService = inject(FavoritosService);
  public _controlCargaService:ControlCargaService = inject(ControlCargaService)
  private _router:Router = inject(Router);
  private _modalService:ModalService = inject(ModalService);

  esFavorito = signal<boolean>(false);
  inmueble:InmuebleImagenDTO;
  inmueblesFavoritos:InmuebleIdDTO[] = [];
  usuarioId:number;
  @Input() idInmueble:number;

  modalData:ModalData = {
    titulo:"",
    mensaje:"",
    imagen:""
  }

  ngOnInit(): void {

    this._controlCargaService.nFases.set(1);
    
    if (this._authService.isLoggedIn()) {
      this.usuarioId = this._authService.usuario()!.id;
      this.getFavoritos();
    } else {
      this._controlCargaService.faseCarga();
    }
    
  }

  getFavoritos():void{
    this._favoritosService.getFavoritosId(this.usuarioId).subscribe({
      next: (idInmuebles:InmuebleIdDTO[]) => {
        this.inmueblesFavoritos = idInmuebles;
        this.esFavorito.set( this.inmueblesFavoritos.some( f => f.id === this.idInmueble ) );
      },
      complete: () => {
        this._controlCargaService.faseCarga();
      }
    });
  }

  addFavorito():void{
    if (this._authService.isLoggedIn()) {
      this._favoritosService.addFavorito(this.usuarioId, this.idInmueble).subscribe({
        next: (inmueble:InmuebleImagenDTO) => {
          this.inmueble = inmueble;

          this.modalData.titulo = "Nuevo Favorito";
          this.modalData.mensaje = `El inmueble situado en la ${this.inmueble.via} ${this.inmueble.nombreVia} de ${this.inmueble.poblacion.nombre} (${this.inmueble.poblacion.provincia.nombre}) con un precio de ${this.inmueble.precio}€ se ha añadido a su lista de favoritos`;
          this.modalData.imagen = "ok-modal.png";
        },
        complete:() => {
          this.esFavorito.set(true);
          this._modalService.open(this.modalData);
        }
      });
    } else {
      this._router.navigate(['/auth/login']);
    }
  }

  deleteFavorito():void{
    if (this._authService.isLoggedIn()) {
      this._favoritosService.deleteFavorito(this.usuarioId, this.idInmueble).subscribe({
        next: (inmueble:InmuebleImagenDTO)=>{
          this.inmueble = inmueble;

          this.modalData.titulo = "Eliminar Favorito";
          this.modalData.mensaje = `El inmueble situado en la ${this.inmueble.via} ${this.inmueble.nombreVia} de ${this.inmueble.poblacion.nombre} (${this.inmueble.poblacion.provincia.nombre}) con un precio de ${this.inmueble.precio}€ ha sido eliminado de su lista de favoritos`;
          this.modalData.imagen = "ok-modal.png";
        },
        complete:() => {
          this.esFavorito.set(false);
          this._modalService.open(this.modalData);
        }
      });
    } else {
      this._router.navigate(['/auth/login']);
    }
  }

}
