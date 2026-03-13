import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BannerIdDTO, BannerImagenDTO } from '../models/dtos';
import { Observable } from 'rxjs';
import { URL_API } from '../environments/globals';

@Injectable({
  providedIn: 'root',
})
export class PaginaBannerService {

  private _http:HttpClient = inject(HttpClient);

  addBannerPagina(paginaId:number, bannerId:number):Observable<BannerImagenDTO> {
    const params = new HttpParams()
    .set('paginaId', paginaId)
    .set('bannerId', bannerId);

    return this._http.post<BannerImagenDTO>(`${URL_API}pagina-banner`, null, {params});
  }

  deleteBannerPagina(paginaId:number, bannerId:number):Observable<BannerImagenDTO> {
    const params = new HttpParams()
    .set('paginaId', paginaId)
    .set('bannerId', bannerId);

    return this._http.delete<BannerImagenDTO>(`${URL_API}pagina-banner`, {params});
  }

  getBannersPagina(id:number):Observable<BannerImagenDTO[]> {
    return this._http.get<BannerImagenDTO[]>(`${URL_API}banners-pagina/${id}`);
  }

  getBannerIdPagina(id:number):Observable<BannerIdDTO[]> {
    return this._http.get<BannerIdDTO[]>(`${URL_API}bannersid-pagina/${id}`);
  }
  
}
