import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioLogin } from '../interfaces/usuario';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cms-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cms-login.component.html',
  styleUrl: './cms-login.component.css'
})
export class CmsLoginComponent {
  loginForm: FormGroup;
  errorLogin: boolean = false;
  errorInfo: string = '';
  
  constructor(private usuarioService: UsuarioService, private fb: FormBuilder,
    private router: Router
  ){
  
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  loginAdmin(): void{
    let usuario: UsuarioLogin = {
      email: this.loginForm.get('email')?.value,
      contrasenya: this.loginForm.get('password')?.value
    };
    this.usuarioService.loginAdmin(usuario).subscribe({
      next: (response) => {
        if(response.success){
          localStorage.setItem('admin','true');
          this.router.navigate(['/cms/home']);
        }else{
          this.errorLogin = true;
          this.errorInfo = response.mensaje;
        }
      }
    });
  }
}
