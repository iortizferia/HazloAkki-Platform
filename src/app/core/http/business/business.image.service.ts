import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Imagen } from 'src/app/shared/models/imagen.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessImageService {

  constructor(private httpService:HttpClient) { }

  obtenerImagenes(idNegocio:string):Observable<Array<Imagen>>{
    return this.httpService.get(environment.negocio_url+"negocios/"+idNegocio+"/imagenes")
    .pipe(
      map((imagenes:Array<Imagen>) => imagenes)
    );    
  }

  guardarImagenes(idNegocio:string, formData:FormData):Observable<Array<Imagen>>{
    return this.httpService.post(environment.negocio_url+"negocios/"+idNegocio+"/imagenes", formData)
    .pipe(
      map((imagenes:Array<Imagen>) => imagenes)
    );
  }

  actualizarPerfil(idNegocio:string, idImagen:string):Observable<Object>{
    return this.httpService.put(environment.negocio_url+"negocios/"+idNegocio+"/imagenes/"+idImagen,{});
  }

  eliminarImagen(idNegocio:string, idImagen:string):Observable<Object>{
    return this.httpService.delete(environment.negocio_url+"negocios/"+idNegocio+"/imagenes/"+idImagen);
  }

}
