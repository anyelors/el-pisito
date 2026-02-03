import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuPrincipal } from './shared/components/menu-principal/menu-principal';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header,MenuPrincipal,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
