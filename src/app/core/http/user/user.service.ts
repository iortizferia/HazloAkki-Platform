import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/user.model';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService:ApiService) { }
  
  
  login(email:string,pwd:string,remeber:boolean): Observable<User>{
    return this.apiService
    .get("authentifications/"+email+"/"+pwd,new HttpParams())
    .pipe(map((user:User) =>{
      return user;
    }))
  }
  
}
