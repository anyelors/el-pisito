import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorStoreService } from '../services/error-store-service';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  let _errorStoreSErvice = inject(ErrorStoreService);
  let _router = inject(Router);

  return next(req).pipe(
    catchError( (err:HttpErrorResponse) => {
      console.log(err);

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
