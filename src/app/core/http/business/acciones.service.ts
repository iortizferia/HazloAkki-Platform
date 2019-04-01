import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Accion } from 'src/app/shared/models/accion.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccionesService {

  constructor(private httpService:HttpClient) { }

  getActions():Observable<Array<Accion>>{
    return this.httpService.get(environment.acciones_url+"acciones")
    .pipe(
      map((acciones:Array<Accion>) => acciones)
    );
  }
}
