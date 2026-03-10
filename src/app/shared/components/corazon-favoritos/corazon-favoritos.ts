import { AfterViewInit, Component, ElementRef, inject, Input, OnInit, signal, ViewChild } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../../core/services/auth-service';
import { FavoritosService } from '../../../core/services/favoritos-service';
import { InmuebleIdDTO, InmuebleImagenDTO } from '../../../core/models/dtos';
import { ControlCargaService } from '../../../core/services/control-carga-service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-corazon-favoritos',
  imports: [RouterLink],
  providers: [ControlCargaService],
  templateUrl: './corazon-favoritos.html',
  styleUrl: './corazon-favoritos.css',
})
export class CorazonFavoritos implements OnInit, AfterViewInit {
    
  public _authService:AuthService = inject(AuthService);
  private _favoritosService:FavoritosService = inject(FavoritosService);
  public _controlCargaService:ControlCargaService = inject(ControlCargaService)
  private _router:Router = inject(Router);

  @ViewChild('favoritoModal') ventanaModalFavoritos!:ElementRef;
  modal!: Modal;

  esFavorito = signal<boolean>(false);
  inmueble:InmuebleImagenDTO;
  inmueblesFavoritos:InmuebleIdDTO[] = [];
  usuarioId:number;
  @Input() idInmueble:number;

  ngOnInit(): void {
    this._controlCargaService.nFases.set(1);
    
    if (this._authService.isLoggedIn()) {
      this.usuarioId = this._authService.usuario()!.id;
      this.getFavoritos();
    } else {
      this._controlCargaService.faseCarga();
    }
    
  }

  ngAfterViewInit(): void {
    this.modal = new Modal(this.ventanaModalFavoritos.nativeElement);
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
        next: (inmueble:InmuebleImagenDTO)=>{
          this.inmueble = inmueble;
        },
        complete:() => {
          this.modal.show();
          this.esFavorito.set(true);
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
        },
        complete:() => {
          this.modal.show();
          this.esFavorito.set(false);
        }
      });
    } else {
      this._router.navigate(['/auth/login']);
    }
  }

  openModal() {
    this.modal.show();
  }

  closeModal() {
    this.modal.hide();
  }

}
