import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tematica } from '../models/entities';
import { URL_API } from '../environments/globals';

@Injectable({
  providedIn: 'root',
})
export class TematicaService {

  private _http:HttpClient = inject(HttpClient);

  getTematicas():Observable<Tematica[]> {
    return this._http.get<Array<Tematica>>(`${URL_API}tematicas`);
  }

  getTematicasActivas(active:number):Observable<Tematica[]> {
    return this._http.get<Tematica[]>(`${URL_API}tematicas-activas/${active}`);
  }

  getTematica(id:number):Observable<Tematica> {
    return this._http.get<Tematica>(`${URL_API}tematica/${id}`);
  }

  addTematica(tematica:Tematica):Observable<Tematica> {
    return this._http.post<Tematica>(`${URL_API}tematica`,tematica);
  }

  updateTematica(tematica:Tematica):Observable<Tematica> {
    return this._http.put<Tematica>(`${URL_API}tematica`,tematica);
  }

  getTematicaActual():Observable<Tematica> {
    return this._http.get<Tematica>(`${URL_API}tematica-actual`);
  }
  
}
