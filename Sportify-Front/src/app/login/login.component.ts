import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioLogin, UsuarioRegistro } from '../interfaces/usuario';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  errorLogin: boolean = false;
  errorRegister: boolean = false;
  errorInfo: string = '';

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService,
    private router: Router, private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(5)]]
    });
  
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(5)]],
      confirmarContrasena: ['', Validators.required]
    }, { validators: this.samePassword });
  }

  login(): void {
    if (this.loginForm.valid) {
      let usuario: UsuarioLogin = {
        email: this.loginForm.get('correo')?.value,
        contrasenya: this.loginForm.get('contrasena')?.value
      };
      this.usuarioService.login(usuario).subscribe({
        next: (response) => {
          if(response.success){
            this.authService.login(response.data);
            this.router.navigate(['/']);
          }else{
            this.errorLogin = true;
            this.errorInfo = response.mensaje;
          }
        }
      });
      
    }
  }

  register(): void {
    if (this.registerForm.valid) {
      let usuario: UsuarioRegistro = {
        email: this.registerForm.get('correo')?.value,
        contrasenya: this.registerForm.get('contrasena')?.value,
        nombre: this.registerForm.get('nombre')?.value,
        telefono: this.registerForm.get('telefono')?.value
      };

      this.usuarioService.register(usuario).subscribe({
        next: (response) => {
          if(response.success){
            this.authService.login(response.data);
            this.router.navigate(['/']);
          }else{
            this.errorRegister = true;
            this.errorInfo = response.mensaje;
          }
        }
      });
    }
  }

  samePassword: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('contrasena')?.value;
    const confirm = group.get('confirmarContrasena')?.value;
  
    return pass === confirm ? null : { contrasenasNoCoinciden: true };
  };
}
