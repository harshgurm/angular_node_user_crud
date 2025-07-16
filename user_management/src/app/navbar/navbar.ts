import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Login } from '../services/login';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  router = inject(Router);
  loginService = inject(Login);
  isLoggedIn$: Observable<boolean>;
  
  constructor() {
    this.isLoggedIn$ = this.loginService.isLoggedIn$;    
  }

  logOut(){
    this.loginService.logOut();
    this.router.navigate(['sign-in']);
  }

}
