import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operacion } from '../models/entities';
import { URL_API } from '../environments/globals';

@Injectable({
  providedIn: 'root',
})
export class OperacionService {

  private _http:HttpClient = inject(HttpClient);

  getOperaciones():Observable<Operacion[]> {
    return this._http.get<Array<Operacion>>(`${URL_API}operaciones`);
  }

  getOperacionesActivas(active:number):Observable<Operacion[]> {
    return this._http.get<Operacion[]>(`${URL_API}operaciones-activas/${active}`);
  }

  getOperacion(id:number):Observable<Operacion> {
    return this._http.get<Operacion>(`${URL_API}operacion/${id}`);
  }

  addOperacion(operacion:Operacion):Observable<Operacion> {
    return this._http.post<Operacion>(`${URL_API}operacion`,operacion);
  }

  updateOperacion(operacion:Operacion):Observable<Operacion> {
    return this._http.put<Operacion>(`${URL_API}operacion`,operacion);
  }
  
}
