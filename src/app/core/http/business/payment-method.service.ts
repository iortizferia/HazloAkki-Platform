import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaymentMethod } from '../../../shared/models/payment-method.model';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  constructor(private httpService:HttpClient) { }

  getPaymentMethods():Observable<Array<PaymentMethod>>{
    return this.httpService.get(environment.negocio_url+"catalogos/metodos/pagos")
    .pipe(
      map((paymentMethod:Array<PaymentMethod>) => paymentMethod)
    );
  }
}
