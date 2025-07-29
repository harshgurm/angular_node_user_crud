import { Routes } from '@angular/router';
import { SignIn } from './sign-in/sign-in';
import { SignUp } from './sign-up/sign-up';
import { Customers } from './customers/customers';
import { PageNotFound } from './page-not-found/page-not-found';
import { authGuard } from './auth/auth.guard';
import { CustomerForm } from './customer-form/customer-form';

export const routes: Routes = [
  {
    path: 'sign-in',
    component: SignIn,
  },
  {
    path: 'sign-up',
    component: SignUp,
  },
  {
    path: 'customers',
    component: Customers,
    canActivate: [authGuard] 
  },
  {
    path: 'customer-form',
    component: CustomerForm,
    canActivate: [authGuard] 
  },
  {
    path: 'customer-form/:id',
    component: CustomerForm,
    canActivate: [authGuard] 
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFound,
  },
];
