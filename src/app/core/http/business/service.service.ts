import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Service } from '../../../shared/models/service.model';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpService:HttpClient) { }

  getServices():Observable<Array<Service>>{
    return this.httpService.get(environment.negocio_url+"catalogos/servicios")
    .pipe(
      map((services:Array<Service>) => services)
    );
  }
}
