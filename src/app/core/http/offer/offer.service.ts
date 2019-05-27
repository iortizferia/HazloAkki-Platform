import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Offer } from 'src/app/shared/models/offer.model';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OfferConfiguration } from 'src/app/shared/models/offer.config.model';

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

  update(offer:Offer):Observable<Object>{
    return this.httpService.put(environment.oferta_url+"ofertas/"+offer.idOferta, offer);
  }

  getOffer(offerId:string){
    return this.httpService.get(environment.oferta_url+"ofertas/"+offerId)
    .pipe(
      map((offer:Offer) => offer)
    );
  }

  getOfferByBusiness(businessId:string){
    return this.httpService.get(environment.oferta_url+"ofertas/negocios/"+businessId)
    .pipe(
      map((offers:Array<Offer>) => offers)
    );
  }

  obtenerConfig(offerId:string){
    return this.httpService.get(environment.oferta_url+"ofertas/"+offerId+"/configuraciones")
    .pipe(
      map((config:OfferConfiguration) => config)
    );
  }

  updateConfig(offerConfig:OfferConfiguration):Observable<Object>{    
    return this.httpService.put(environment.oferta_url+"ofertas/"+offerConfig.idOferta+"/configuraciones", offerConfig);
  }

  updateEstatus(offerId:string, idStatus):Observable<Object>{ 
    return this.httpService.patch(environment.oferta_url+"ofertas/"+offerId, idStatus);
  }

}
