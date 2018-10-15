import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../http.service';
import { Business } from '../../../shared/models/business.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private httpService:HttpService) { }

  create(business:Business):Observable<Business>{
    return this.httpService.post("negocios", business)
    .pipe(
      map((newBusiness:Business) => newBusiness)
    );
  }

  getByAccount(accountId:string):Observable<Array<Business>>{
    return this.httpService.get("negocios/cuenta/"+accountId)
    .pipe(
      map((business:Array<Business>) => business)
    );
  }

}
