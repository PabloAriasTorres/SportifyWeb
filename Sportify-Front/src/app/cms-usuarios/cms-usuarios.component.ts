import { Component } from '@angular/core';
import { UsuarioRegistro, UsuarioResponse } from '../interfaces/usuario';
import { UsuarioService } from '../services/usuario.service';
import { CmsHeaderComponent } from "../cms-header/cms-header.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cms-usuarios',
  standalone: true,
  imports: [CmsHeaderComponent,CommonModule],
  templateUrl: './cms-usuarios.component.html',
  styleUrl: './cms-usuarios.component.css'
})
export class CmsUsuariosComponent {
  usuarios: UsuarioRegistro[] = [];
  currentPage: number = 1;
  hasMore: boolean = true;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.usuarioService.getUsuarios(this.currentPage).subscribe((response: UsuarioResponse) => {
      this.usuarios = response.usuarios;
      this.hasMore = response.currentPage < response.lastPage;
    });
  }

  nextPage(): void {
    if (this.hasMore) {
      this.currentPage++;
      this.loadUsuarios();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsuarios();
    }
  }

  crearUsuario(): void {
    this.router.navigate([`/cms/usuarios/crear`]);
  }

  editarUsuario(usuarioId: number): void {
    this.router.navigate([`/cms/usuarios/editar/${usuarioId}`]);
  }

  borrarUsuario(usuarioId: number): void {
    this.usuarioService.deleteUsuario(usuarioId).subscribe({
      next: () => this.loadUsuarios(),
      error: () => alert('Error al intentar borrar el usuario'),
    });
  }
}
