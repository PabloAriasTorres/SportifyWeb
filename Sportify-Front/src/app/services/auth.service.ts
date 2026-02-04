import { Injectable } from '@angular/core';
import { UsuarioLogin } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioActual: UsuarioLogin | null = null;

  constructor() {
    if(this.isBrowser()){
      const usuarioGuardado = localStorage.getItem('usuario');
      if (usuarioGuardado) {
        this.usuarioActual = JSON.parse(usuarioGuardado);
      }
    }
  }

  login(usuario: UsuarioLogin): void {
    this.usuarioActual = usuario;
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  logout(): void {
    this.usuarioActual = null;
    localStorage.removeItem('usuario');
  }

  logoutAdmin(): void {
    localStorage.removeItem('admin');
  }

  getUsuario(): UsuarioLogin | null {
    return this.usuarioActual;
  }

  isLoggedIn(): boolean {
    return this.usuarioActual !== null;
  }

  isBrowser(): boolean { //HAY QUE VERIFICAR SI ESTAMOS EN EL NAVEGADOR ANTES DE USAR LOCALSTORAGE
    return typeof window !== 'undefined';
  }
}
