import { Injectable } from '@angular/core';
import { Account } from '../../../shared/models/account.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpService:HttpClient) { }

  addAccount(account:Account): Observable<Account>{
    return this.httpService.post(environment.cuenta_url+"cuentas", account).pipe(
      map((newAccount:Account) => newAccount)
    );
  }

}
