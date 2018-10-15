import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../http.service';
import { PaymentMethod } from '../../../shared/models/payment-method.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  constructor(private httpService:HttpService) { }

  getPaymentMethods():Observable<Array<PaymentMethod>>{
    return this.httpService.get("catalogos/metodos/pagos")
    .pipe(
      map((paymentMethod:Array<PaymentMethod>) => paymentMethod)
    );
  }
}
