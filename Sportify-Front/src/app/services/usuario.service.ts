import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioLogin, UsuarioRegistro } from '../interfaces/usuario';
import { AppConfig } from '../../app-config';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = AppConfig.apiUrl;
  constructor(private http: HttpClient) {}

  login(usuario: UsuarioLogin): Observable<any>{
      return this.http.post<UsuarioLogin>(`${this.apiUrl}/login`,usuario);
  }

  register(usuario: UsuarioRegistro): Observable<any>{
    return this.http.post<UsuarioRegistro>(`${this.apiUrl}/register`,usuario);
  }

  loginAdmin(usuario: UsuarioLogin): Observable<any>{
      return this.http.post<UsuarioLogin>(`${this.apiUrl}/loginAdmin`,usuario);
  }

  getUsuarios(page: number = 1): Observable<any>{
    return this.http.get<UsuarioRegistro[]>(`${this.apiUrl}/usuarios?page=${page}`);
  }

  deleteUsuario(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/usuario/${id}`);
  }

  getUsuario(id: number): Observable<any>{
    return this.http.get<UsuarioRegistro>(`${this.apiUrl}/usuario/${id}`);
  }

  updateUsuario(id: number, usuario: UsuarioRegistro): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/usuario/${id}`, usuario);
  }
}
