import { Component } from '@angular/core';
import { CmsHeaderComponent } from "../cms-header/cms-header.component";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { CommonModule } from '@angular/common';
import { UsuarioRegistro } from '../interfaces/usuario';

@Component({
  selector: 'app-cms-usuarios-modificar',
  standalone: true,
  imports: [CmsHeaderComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './cms-usuarios-modificar.component.html',
  styleUrl: './cms-usuarios-modificar.component.css'
})
export class CmsUsuariosModificarComponent {
  usuarioForm!: FormGroup;
  isEditMode = false;
  usuarioId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.usuarioId = +id;
        this.loadUsuario(this.usuarioId);
      }
    });
  }

  initForm(): void {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      contrasenya: ['', this.isEditMode ? [] : Validators.required]
    });
  }

  loadUsuario(id: number): void {
    this.usuarioService.getUsuario(id).subscribe({
      next: (usuario) => this.usuarioForm.patchValue(usuario),
      error: () => alert('Error al cargar el usuario'),
    });
  }

  submitForm(): void {
    if (this.usuarioForm.valid) {
      const usuarioData: UsuarioRegistro = {
        nombre: this.usuarioForm.get('nombre')?.value,
        email: this.usuarioForm.get('email')?.value,
        telefono: this.usuarioForm.get('telefono')?.value,
        contrasenya: this.isEditMode ? undefined : this.usuarioForm.get('contrasenya')?.value,
      };
      
      if (this.isEditMode && this.usuarioId) {
        this.usuarioService.updateUsuario(this.usuarioId, usuarioData).subscribe({
          next: () => this.router.navigate(['/cms/usuarios']),
          error: () => alert('Error al actualizar el usuario'),
        });
      } else {
        this.usuarioService.register(usuarioData).subscribe({
          next: () => this.router.navigate(['/cms/usuarios']),
          error: () => alert('Error al crear el usuario'),
        });
      }
    }
  }
}
