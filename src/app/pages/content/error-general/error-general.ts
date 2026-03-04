import { Component, inject } from '@angular/core';
import { ErrorStoreService } from '../../../core/services/error-store-service';

@Component({
  selector: 'app-error-general',
  imports: [],
  templateUrl: './error-general.html',
  styleUrl: './error-general.css',
})
export class ErrorGeneral {

  public _errorStoreService:ErrorStoreService = inject(ErrorStoreService);

}
