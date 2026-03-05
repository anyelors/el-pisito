import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorStoreService } from '../services/error-store-service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  let _errorStoreSErvice = inject(ErrorStoreService);
  let _authService:AuthService = inject(AuthService);
  let _router = inject(Router);

  return next(req).pipe(
    catchError( (err:HttpErrorResponse) => {
      console.log(err);

      if (err.error.status == 401) {
        _authService.logout();
      }

      //Se setea las variables signal estatus y errorMensaje
      _errorStoreSErvice.setErrorStatus(err.error.status);
      if (err.error.mensaje){
        _errorStoreSErvice.setErrorMensaje(err.error.mensaje); //ErrorResponseDTO
      }else {
        _errorStoreSErvice.setErrorMensaje(err.error.message);
      }

      _router.navigate(["/error"]);

      return throwError(()=>err);
    } )
  );

};
