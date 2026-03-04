import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-menu-principal',
  imports: [RouterLink],
  templateUrl: './menu-principal.html',
  styleUrl: './menu-principal.css',
})
export class MenuPrincipal {

  public _authService:AuthService = inject(AuthService);

  logout():void{
    this._authService.logout();
  }

}
