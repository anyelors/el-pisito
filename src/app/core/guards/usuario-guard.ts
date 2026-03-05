import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { ErrorStoreService } from '../services/error-store-service';

export const usuarioGuard: CanActivateFn = (route, state) => {
  
  let _authService:AuthService = inject(AuthService);
  let _errorStoreService:ErrorStoreService = inject(ErrorStoreService);
  let _router:Router = inject(Router);

  if (_authService.usuario()?.rol === "ROLE_USUARIO" || _authService.usuario()?.rol === "ROLE_ADMIN" || _authService.usuario()?.rol === "ROLE_SUPERADMIN") {
    return true;
  }

  _router.navigate(['/error'])
  return false;
  
};
