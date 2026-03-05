import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

export const baseGuard: CanActivateFn = (route, state) => {

  let _authService:AuthService = inject(AuthService);
  let _router:Router = inject(Router);

  if (_authService.isLoggedIn()){
    return true;
  }

  _router.navigate(['/auth/login'])
  return false;
  
};
