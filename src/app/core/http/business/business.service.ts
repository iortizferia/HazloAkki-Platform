import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Business } from '../../../shared/models/business.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private httpService:HttpClient) { }

  create(business:Business):Observable<Business>{
    return this.httpService.post(environment.negocio_url+"negocios", business)
    .pipe(
      map((newBusiness:Business) => newBusiness)
    );
  }

  getByAccount(accountId:string):Observable<Array<Business>>{
    return this.httpService.get(environment.negocio_url+"negocios/cuenta/"+accountId)
    .pipe(
      map((business:Array<Business>) => business)
    );
  }
  getBusinessById(businessId:string):Observable<Business>{
    return this.httpService.get(environment.negocio_url+"negocios/"+businessId)
    .pipe(
      map((business:Business) => business)
    );
  }
  
  delete(businessId:string):Observable<Object>{
    return this.httpService.delete(environment.negocio_url+"negocios/"+businessId);
  }

  update(business:Business):Observable<Object>{
    return this.httpService.put(environment.negocio_url+"negocios/"+business.idNegocio, business);
  }

}
