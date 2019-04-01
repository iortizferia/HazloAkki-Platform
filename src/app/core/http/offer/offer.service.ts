import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Offer } from 'src/app/shared/models/offer.model';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private httpService:HttpClient) { }

  create(offer:Offer):Observable<Offer>{
    return this.httpService.post(environment.oferta_url+"ofertas", offer)
    .pipe(
      map((newOffer:Offer) => newOffer)
    );
  }

  getOffer(offerId:string,businessId:string){
    return this.httpService.get(environment.oferta_url+"ofertas/"+offerId+"/"+businessId)
    .pipe(
      map((business:Offer) => business)
    );
  }
  getOfferByBusiness(businessId:string){
    return this.httpService.get(environment.oferta_url+"ofertas/negocios/"+businessId)
    .pipe(
      map((business:Array<Offer>) => business)
    );
  }
}
