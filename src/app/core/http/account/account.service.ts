import { Injectable } from '@angular/core';
import { Account } from '../../../shared/models/account.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpService:HttpService) { }

  addAccount(account:Account): Observable<Account>{
    return this.httpService.post("cuentas", account).pipe(
      map((newAccount:Account) => newAccount)
    );
  }

}
