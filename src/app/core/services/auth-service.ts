import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_AUTH } from '../enviroments/globals';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _http:HttpClient = inject(HttpClient);

  login(datos:Credential):Observable<any>{
    return this._http.post<any>(`${URL_AUTH}login`,datos);
  }
  
}
