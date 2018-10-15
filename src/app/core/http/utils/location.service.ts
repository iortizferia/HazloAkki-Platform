import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../http.service';
import { MXLocation } from '../../../shared/models/mxlocation.model';

const location_api = "https://api-codigos-postales.herokuapp.com/v2/codigo_postal/";

@Injectable({
  providedIn: 'root'
})
export class MXLocationService {

  constructor(private httpService:HttpService) { }

  getLocation(zipcode:string):Observable<MXLocation>{
    return this.httpService
    .get(location_api+zipcode)
    .pipe(map((location:MXLocation) =>{
      return location;
    }))
  }
}
