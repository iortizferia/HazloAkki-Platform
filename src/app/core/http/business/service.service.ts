import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../http.service';
import { Service } from '../../../shared/models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpService:HttpService) { }

  getServices():Observable<Array<Service>>{
    return this.httpService.get("catalogos/servicios")
    .pipe(
      map((services:Array<Service>) => services)
    );
  }
}
