import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Login {

  http = inject(HttpClient);
  jwtHelper = inject(JwtHelperService);
  
  private loggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());
  public isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();

  userLogin(data: {}) {
    return this.http.post<{ token?: string }>('http://localhost:3000/signin/', data).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.loggedIn.next(true);
        }
      })
    );
  }

  userSignUp(data:{}){
    return this.http.post('http://localhost:3000/signup/', data);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  
  logOut(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }
}
