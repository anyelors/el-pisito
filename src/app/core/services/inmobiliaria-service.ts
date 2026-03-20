import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { InmobiliariaImagenDTO } from '../models/dtos';
import { Observable } from 'rxjs';
import { URL_API } from '../environments/globals';
import { Inmobiliaria } from '../models/entities';

@Injectable({
  providedIn: 'root',
})
export class InmobiliariaService {

  private _http:HttpClient = inject(HttpClient);

  getInmobiliarias():Observable<InmobiliariaImagenDTO[]> {
    return this._http.get<Array<InmobiliariaImagenDTO>>(`${URL_API}inmobiliarias`);
  }

  getInmobiliariasActivos(active:number):Observable<InmobiliariaImagenDTO[]> {
    return this._http.get<InmobiliariaImagenDTO[]>(`${URL_API}inmobiliarias-activas/${active}`);
  }

  getInmobiliaria(id:number):Observable<InmobiliariaImagenDTO> {
    return this._http.get<InmobiliariaImagenDTO>(`${URL_API}inmobiliaria/${id}`);
  }

  addInmobiliaria(inmobiliaria:Inmobiliaria):Observable<InmobiliariaImagenDTO> {
    return this._http.post<InmobiliariaImagenDTO>(`${URL_API}inmobiliaria`,inmobiliaria);
  }

  updateInmobiliaria(inmobiliaria:Inmobiliaria):Observable<InmobiliariaImagenDTO> {
    return this._http.put<InmobiliariaImagenDTO>(`${URL_API}inmobiliaria`,inmobiliaria);
  }
  
}
