import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardType } from '../../../shared/models/card-type.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardTypeService {

  constructor(private httpService:HttpClient) { }

  getCardType():Observable<Array<CardType>>{
    return this.httpService.get(environment.negocio_url+"catalogos/tarjetas")
    .pipe(
      map((cardType:Array<CardType>) => cardType)
    );
  }
}
