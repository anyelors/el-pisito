import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_AUTH } from '../enviroments/globals';
import { Credenciales, CredencialesRespuesta } from '../models/dtos';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _http:HttpClient = inject(HttpClient);

  login(datos:Credenciales):Observable<CredencialesRespuesta>{
    return this._http.post<CredencialesRespuesta>(`${URL_AUTH}login`,datos);
  }
  
}
