import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { Observable, of } from 'rxjs';
import { UserService } from '../http/user/user.service';
import { map, catchError } from 'rxjs/operators';

const currentUserKey = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: User | null;


  constructor(private userService:UserService) { }

  /**
   * This runs once on application startup.
   */
  pupulate() {
    const savedUser = sessionStorage.getItem(currentUserKey) ||
      localStorage.getItem(currentUserKey);

      if(savedUser){
        this.currentUser = JSON.parse(savedUser);
      }
  }

  /**
   * Authenticates the user.
   * @param {email} The user email
   * @param {pwd} The user password
   * @return {Observable<User>} The user credentials.
   */
  login(email:string,pwd:string, remember:boolean): Observable<boolean> {

    return this.userService.login(email, pwd, remember).pipe(
      map((user:User)=>{
        this.setCurrentUser(user, remember);
        return true;
      })
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCurrentUser();
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {User=} user The user credentials.
   * @param {boolean=} remember True to remember credentials across sessions.
   */
  setCurrentUser(user?:User, remember?:boolean){
    this.currentUser = user || null;

    if (user) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(currentUserKey, JSON.stringify(user));
    } else {
      sessionStorage.removeItem(currentUserKey);
      localStorage.removeItem(currentUserKey);
    }
  }

  /**
   * Gets the user credentials.
   * @return {User} The user credentials or null if the user is not authenticated.
   */
  getCurrentUser(){
    return this.currentUser;
  }

}
