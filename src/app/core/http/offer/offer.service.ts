import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Offer } from 'src/app/shared/models/offer.model';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private httpService:HttpService) { }

  create(offer:Offer):Observable<Offer>{
    return this.httpService.post("ofertas", offer)
    .pipe(
      map((newOffer:Offer) => newOffer)
    );
  }

  getOffer(offerId:string,businessId:string){
    return this.httpService.get("ofertas/"+offerId+"/"+businessId)
    .pipe(
      map((business:Offer) => business)
    );
  }
  getOfferByBusiness(businessId:string){
    return this.httpService.get("ofertas/negocios/"+businessId)
    .pipe(
      map((business:Array<Offer>) => business)
    );
  }
}
