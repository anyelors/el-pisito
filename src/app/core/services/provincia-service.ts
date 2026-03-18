import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Provincia } from '../models/entities';
import { Observable } from 'rxjs';
import { URL_API } from '../environments/globals';

@Injectable({
  providedIn: 'root',
})
export class ProvinciaService {

  private _http:HttpClient = inject(HttpClient);

  getProvincias():Observable<Provincia[]> {
    return this._http.get<Array<Provincia>>(`${URL_API}provincias`);
  }

  getProvinciasActivas(active:number):Observable<Provincia[]> {
    return this._http.get<Provincia[]>(`${URL_API}provincias-activas/${active}`);
  }

  getProvincia(id:number):Observable<Provincia> {
    return this._http.get<Provincia>(`${URL_API}provincia/${id}`);
  }

  addProvincia(poblacion:Provincia):Observable<Provincia> {
    return this._http.post<Provincia>(`${URL_API}provincia`,poblacion);
  }

  updateProvincia(poblacion:Provincia):Observable<Provincia> {
    return this._http.put<Provincia>(`${URL_API}provincia`,poblacion);
  }
  
}
