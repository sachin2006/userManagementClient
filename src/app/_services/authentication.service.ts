import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { User } from '../_models/user';
const API_URL = 'http://localhost:4000';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, 
              private decoder: JwtHelperService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  } 

  login(username: string, password: string) {
    console.log("===========")
    return this.http.post<any>(API_URL + '/users/authenticate', { username, password })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            console.log(user)
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }

            return user;
        }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getToken() : Observable<string> {
    const token = localStorage.getItem('token');
    var isTokenExpired:boolean = false;
    if(token)
    {
      isTokenExpired = this.decoder.isTokenExpired(token);
      if (!isTokenExpired) {
        return of(token);
      }
    }
    return null;
  }

  isTokenActive()
  {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser.token;
    var isTokenExpired:boolean = false;
    if(token)
    {
      isTokenExpired = this.decoder.isTokenExpired(token);
      if (!isTokenExpired) {
        return true;
      }
    }
    return false;
  }  
}
