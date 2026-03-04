import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../models/entities';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../models/dtos';
import { URL_API } from '../environments/globals';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private _http:HttpClient = inject(HttpClient);

  addUsuario(usuario:Usuario):Observable<UsuarioDTO>{

    return this._http.post<UsuarioDTO>(`${URL_API}usuario`,usuario);
    
  }
  
}
