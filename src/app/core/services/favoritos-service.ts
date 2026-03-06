import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { InmuebleIdDTO, InmuebleImagenDTO } from '../models/dtos';
import { Observable } from 'rxjs';
import { URL_API } from '../environments/globals';

@Injectable({
  providedIn: 'root',
})
export class FavoritosService {

  private _http:HttpClient = inject(HttpClient);

  addFavorito(usuarioId:number, inmuebleId:number):Observable<InmuebleImagenDTO> {
    const params = new HttpParams()
    .set('usuarioId', usuarioId)
    .set('inmuebleId', inmuebleId);

    return this._http.post<InmuebleImagenDTO>(`${URL_API}favorito`, null, {params});
  }

  deleteFavorito(usuarioId:number, inmuebleId:number):Observable<InmuebleImagenDTO> {
    const params = new HttpParams()
    .set('usuarioId', usuarioId)
    .set('inmuebleId', inmuebleId);

    return this._http.delete<InmuebleImagenDTO>(`${URL_API}favorito`, {params});
  }

  getFavoritosDatos(id:number):Observable<InmuebleImagenDTO[]> {
    return this._http.get<InmuebleImagenDTO[]>(`${URL_API}favoritos-usuario/${id}`);
  }

  getFavoritosId(id:number):Observable<InmuebleIdDTO[]> {
    return this._http.get<InmuebleIdDTO[]>(`${URL_API}favoritosid-usuario/${id}`);
  }
  
}
