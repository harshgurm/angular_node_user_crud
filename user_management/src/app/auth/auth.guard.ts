import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Login } from '../services/login';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(Login);
  const router = inject(Router);

  if (loginService.isAuthenticated()) {
    return true;
  }

  // If not authenticated, redirect to the sign-in page
  router.navigate(['/sign-in']);
  return false;
};