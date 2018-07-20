import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/user.model';
import { map } from 'rxjs/operators';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService:HttpService) { }
  
  
  login(email:string,pwd:string,remeber:boolean): Observable<User>{
    return this.httpService
    .get("authentifications/"+email+"/"+pwd)
    .pipe(map((user:User) =>{
      return user;
    }))
  }
  
}
