import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BannerCarouselIdDTO, BannerCarouselImagenDTO } from '../models/dtos';
import { URL_API } from '../environments/globals';

@Injectable({
  providedIn: 'root',
})
export class TematicaBannerCarouselService {

  private _http:HttpClient = inject(HttpClient);

  addBannerCarouselTematica(tematicaId:number, bannerCarouselId:number):Observable<BannerCarouselImagenDTO> {
    const params = new HttpParams()
    .set('tematicaId', tematicaId)
    .set('bannerCarouselId', bannerCarouselId);

    return this._http.post<BannerCarouselImagenDTO>(`${URL_API}tematica-bannercarousel`, null, {params});
  }

  deleteBannerCarouselTematica(tematicaId:number, bannerCarouselId:number):Observable<BannerCarouselImagenDTO> {
    const params = new HttpParams()
    .set('tematicaId', tematicaId)
    .set('bannerCarouselId', bannerCarouselId);

    return this._http.delete<BannerCarouselImagenDTO>(`${URL_API}tematica-bannercarousel`, {params});
  }

  getBannersCarouselTematica(id:number):Observable<BannerCarouselImagenDTO[]> {
    return this._http.get<BannerCarouselImagenDTO[]>(`${URL_API}bannerscarousel-tematica/${id}`);
  }

  getBannerCarouselIdTematica(id:number):Observable<BannerCarouselIdDTO[]> {
    return this._http.get<BannerCarouselIdDTO[]>(`${URL_API}bannerscarouselid-tematica/${id}`);
  }
  
}
