import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../../core/services/usuario-service';
import { Router } from '@angular/router';
import { Usuario } from '../../../core/models/entities';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-usuario',
  imports: [ReactiveFormsModule],
  templateUrl: './registro-usuario.html',
  styleUrl: './registro-usuario.css',
})
export class RegistroUsuario {

  private _usuarioService:UsuarioService = inject(UsuarioService);
  private _router:Router = inject(Router);

  usuario:Usuario = {
    nombre:'',
    password:'',
    email:''
  }

  registerForm:FormGroup = new FormGroup({

    elUsuario: new FormControl('',[Validators.required]),
    elPassword: new FormControl('',[Validators.required]),
    elEmail: new FormControl('',[Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")])

  })

  register():void{
    if(this.registerForm.valid){
      this.usuario.nombre = this.registerForm.get('elUsuario')?.value || '';
      this.usuario.password = this.registerForm.get('elPassword')?.value || '';
      this.usuario.email = this.registerForm.get('elEmail')?.value || '';

      this._usuarioService.addUsuario(this.usuario).subscribe({
        next:(datos) => {},
        complete:() => {this._router.navigate(["/auth/login"])}
      });
    }
  }

}
