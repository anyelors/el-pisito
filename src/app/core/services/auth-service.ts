import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { URL_API, URL_AUTH } from '../environments/globals';
import { Credenciales, CredencialesRespuesta, UsuarioDTO } from '../models/dtos';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _http:HttpClient = inject(HttpClient);
  private _router:Router = inject(Router);
  
  isLoggedIn = signal<boolean>(false);
  usuario = signal<UsuarioDTO | null>(null);
  loading = signal<boolean>(true);

  login(datos:Credenciales):void{
    this._http.post<UsuarioDTO>(`${URL_AUTH}login`,datos).subscribe({
      next: (datos:UsuarioDTO) => {
        this.usuario.set(datos);
        this.isLoggedIn.set(true);
        this.loading.set(false);
      },
      complete: () => {
        this._router.navigate(["/"])
      }
    });
  }

  logout():void{
    this._http.get<CredencialesRespuesta>(`${URL_AUTH}logout`).subscribe({
      next: (datos:CredencialesRespuesta) => {
        //datos.mensaje;
        this.usuario.set(null);
        this.isLoggedIn.set(false);
      }
    });
  }

  getMe():void{
    this._http.get<UsuarioDTO>(`${URL_API}me`).subscribe({
      next: (datos:UsuarioDTO) => {
        if (datos.id) {
          this.usuario.set(datos);
          this.isLoggedIn.set(true);
          this.loading.set(false);
        } else {
          this.usuario.set(null);
          this.isLoggedIn.set(false);
          this.loading.set(false);
        }
      }
    });
  }
  
}
