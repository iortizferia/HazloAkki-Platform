import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../http.service';
import { CardType } from '../../../shared/models/card-type.model';

@Injectable({
  providedIn: 'root'
})
export class CardTypeService {

  constructor(private httpService:HttpService) { }

  getCardType():Observable<Array<CardType>>{
    return this.httpService.get("catalogos/tarjetas")
    .pipe(
      map((cardType:Array<CardType>) => cardType)
    );
  }
}
