import { AfterViewInit, Component, effect, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuPrincipal } from './shared/components/menu-principal/menu-principal';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { AuthService } from './core/services/auth-service';
import * as bootstrap from 'bootstrap';
import { ModalService } from './core/services/modal-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header,MenuPrincipal,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit {

  private _authService:AuthService = inject(AuthService);
  public _modalService:ModalService = inject(ModalService);

  @ViewChild('modal') modalElement!: ElementRef;
  modal!: bootstrap.Modal;

  constructor() {
    
    effect(() => {
      const isOpen:boolean = this._modalService.isOpen();

      if (!isOpen) return;

      if (isOpen) {
        this.modal.show();
      } else {
        this.modal.hide();
      }
    });

  }

  ngOnInit(): void {
    this._authService.getMe();
  }

  ngAfterViewInit():void {
    this.modal = new bootstrap.Modal(this.modalElement.nativeElement);
    this.modalElement.nativeElement.addEventListener('hidden.bs.modal', () => {
      this._modalService.close();
    });
  }
  
}
