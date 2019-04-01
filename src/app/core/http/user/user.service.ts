import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/user.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService:HttpClient) { }
  
  
  login(email:string,pwd:string,remeber:boolean): Observable<User>{
    return this.httpService
    .get(environment.login_url+"authentifications/"+email+"/"+pwd)
    .pipe(map((user:User) =>{
      return user;
    }))
  }
  
}
