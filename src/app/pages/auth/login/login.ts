import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { Credenciales } from '../../../core/models/dtos';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private _authService:AuthService = inject(AuthService);

  credenciales:Credenciales = {
    username: '',
    password: ''
  }

  loginForm = new FormGroup({
    elUsuario: new FormControl('', [Validators.required]),
    elPassword: new FormControl('', [Validators.required])
  });

  login():void{
    if(this.loginForm.valid){
      this.credenciales.username = this.loginForm.get('elUsuario')?.value || '';
      this.credenciales.password = this.loginForm.get('elPassword')?.value || '';
      
      this._authService.login(this.credenciales);
    }
  }

}
