import { Routes } from '@angular/router';
import { SignIn } from './sign-in/sign-in';
import { SignUp } from './sign-up/sign-up';
import { Customers } from './customers/customers';
import { PageNotFound } from './page-not-found/page-not-found';
import { AddCustomer } from './add-customer/add-customer';
import { EditCustomer } from './edit-customer/edit-customer';
import { authGuard } from './auth/auth.guard';

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
    path: 'add-customer',
    component: AddCustomer,
    canActivate: [authGuard] 
  },
  {
    path: 'edit-customer/:id',
    component: EditCustomer,
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
