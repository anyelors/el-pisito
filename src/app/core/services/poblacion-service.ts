import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_API } from '../environments/globals';
import { Poblacion } from '../models/entities';

@Injectable({
  providedIn: 'root',
})
export class PoblacionService {

  private _http:HttpClient = inject(HttpClient);

  getPoblaciones():Observable<Poblacion[]> {
    return this._http.get<Array<Poblacion>>(`${URL_API}poblaciones`);
  }

  getPoblacionesActivas(active:number):Observable<Poblacion[]> {
    return this._http.get<Poblacion[]>(`${URL_API}poblaciones-activas/${active}`);
  }

  getPoblacion(id:number):Observable<Poblacion> {
    return this._http.get<Poblacion>(`${URL_API}poblacion/${id}`);
  }

  addPoblacion(poblacion:Poblacion):Observable<Poblacion> {
    return this._http.post<Poblacion>(`${URL_API}poblacion`,poblacion);
  }

  updatePoblacion(poblacion:Poblacion):Observable<Poblacion> {
    return this._http.put<Poblacion>(`${URL_API}poblacion`,poblacion);
  }
  
}
