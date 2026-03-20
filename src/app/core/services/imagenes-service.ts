import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImagenDTO } from '../models/dtos';
import { URL_IMAGEN } from '../environments/globals';
import { Imagen } from '../models/entities';

@Injectable({
  providedIn: 'root',
})
export class ImagenesService {

   private _http:HttpClient = inject(HttpClient);
   
     uploadImagen(formData:FormData):Observable<ImagenDTO> {
       return this._http.post<ImagenDTO>(`${URL_IMAGEN}upload`, formData);
     }

     updateImagen(imagen:Imagen):Observable<ImagenDTO>{
      return this._http.put<ImagenDTO>(`${URL_IMAGEN}imagen`,imagen);
     }

     deleteImagen(idImagen:number):Observable<ImagenDTO>{
      return this._http.delete<ImagenDTO>(`${URL_IMAGEN}imagen/${idImagen}`);
    }
   
  
}
