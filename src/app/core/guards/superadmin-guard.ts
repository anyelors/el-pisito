import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { ErrorStoreService } from '../services/error-store-service';

export const superadminGuard: CanActivateFn = (route, state) => {
  let _authService:AuthService = inject(AuthService);
  let _errorStoreService:ErrorStoreService = inject(ErrorStoreService);
  let _router:Router = inject(Router);

  if (_authService.usuario()?.rol === "ROLE_SUPERADMIN") {
    return true;
  }

  _errorStoreService.errorStatus.set(403);
  _errorStoreService.errorMensaje.set("No tiene permisos para acceder al recurso solicitado")
  _router.navigate(['/error'])
  return false;
};
