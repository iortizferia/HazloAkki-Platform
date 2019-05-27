import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Imagen } from 'src/app/shared/models/imagen.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfferImagesService {

  constructor(private httpService:HttpClient) { }

  obtenerImagenes(idOferta:string):Observable<Array<Imagen>>{
    return this.httpService.get(environment.oferta_url+"ofertas/"+idOferta+"/imagenes")
    .pipe(
      map((imagenes:Array<Imagen>) => imagenes)
    );    
  }

  guardarImagenes(idOferta:string, formData:FormData):Observable<Array<Imagen>>{
    return this.httpService.post(environment.oferta_url+"ofertas/"+idOferta+"/imagenes", formData)
    .pipe(
      map((imagenes:Array<Imagen>) => imagenes)
    );
  }

  eliminarImagen(idOferta:string, idImagen:string):Observable<Object>{
    return this.httpService.delete(environment.oferta_url+"ofertas/"+idOferta+"/imagenes/"+idImagen);
  }
  
}
