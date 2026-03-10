import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuPrincipal } from './shared/components/menu-principal/menu-principal';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { AuthService } from './core/services/auth-service';

declare var bootstrap:any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header,MenuPrincipal,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit {
    
  private _authService:AuthService = inject(AuthService);

  ngOnInit(): void {
    this._authService.getMe();
  }

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  
}
