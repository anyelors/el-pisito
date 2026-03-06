import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InmuebleImagenDTO } from '../models/dtos';
import { URL_API } from '../environments/globals';
import { Inmueble } from '../models/entities';

@Injectable({
  providedIn: 'root',
})
export class InmuebleService {

  private _http:HttpClient = inject(HttpClient);

  getInmuebles():Observable<InmuebleImagenDTO[]> {
    return this._http.get<Array<InmuebleImagenDTO>>(`${URL_API}inmuebles`);
  }

  getInmueblesActivos(active:number):Observable<InmuebleImagenDTO[]> {
    return this._http.get<InmuebleImagenDTO[]>(`${URL_API}inmuebles-activos/${active}`);
  }

  getInmueblesPortada():Observable<InmuebleImagenDTO[]> {
    return this._http.get<InmuebleImagenDTO[]>(`${URL_API}inmuebles-portada`);
  }

  getInmueblesInmobiliaria(id:number):Observable<InmuebleImagenDTO[]> {
    return this._http.get<InmuebleImagenDTO[]>(`${URL_API}inmuebles-inmobiliaria/${id}`);
  }

  getInmueble(id:number):Observable<InmuebleImagenDTO> {
    return this._http.get<InmuebleImagenDTO>(`${URL_API}inmueble/${id}`);
  }

  addInmueble(inmueble:Inmueble):Observable<InmuebleImagenDTO> {
    return this._http.post<InmuebleImagenDTO>(`${URL_API}inmueble`,inmueble);
  }

  updateInmueble(inmueble:Inmueble):Observable<InmuebleImagenDTO> {
    return this._http.put<InmuebleImagenDTO>(`${URL_API}inmueble`,inmueble);
  }

  getInmueblesFinder(tipoId:number, poblacionId:number, operacionId:number):Observable<InmuebleImagenDTO[]> {
    return this._http.get<InmuebleImagenDTO[]>(`${URL_API}finder/${tipoId}/${poblacionId}/${operacionId}`);
  }
  
}
