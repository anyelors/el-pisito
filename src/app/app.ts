import { AfterViewInit, Component, ElementRef, inject, Input, OnInit, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuPrincipal } from './shared/components/menu-principal/menu-principal';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { AuthService } from './core/services/auth-service';
import * as bootstrap from 'bootstrap';
import { ModalService } from './core/services/modal-service';
import { ModalData } from './core/models/auxiliares';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header,MenuPrincipal,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit {
    
  private _authService:AuthService = inject(AuthService);
  public _modalService:ModalService = inject(ModalService);

  titulo:string|undefined;
  mensaje:string|undefined;
  imagen:string|undefined;
  accion:string|undefined;

  acciones = {
    openModal:()=> this.modal.show(),
    closeModal:()=> this.modal.hide(),
  };

  @ViewChild('modal') modalElement!: ElementRef;
  modal!: bootstrap.Modal;

  ngOnInit(): void {
    this._modalService.modalState$.subscribe({
      next: (datos:ModalData) =>{
        console.log(datos);
        this.titulo = datos.titulo;
        this.mensaje = datos.mensaje;
        this.imagen = datos.imagen;
        this.accion = datos.accion;
      },
      complete: () => {
        this.acciones[this.accion as keyof typeof this.acciones]();
      }
    });
    this._authService.getMe();
  }

  ngAfterViewInit() {
    this.modal = new bootstrap.Modal(this.modalElement.nativeElement);
  }

  closeModal():void {
    this.modal.hide();
  }
  
}
