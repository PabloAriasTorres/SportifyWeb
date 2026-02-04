import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  esHome: boolean = false;
  logeado: boolean = false;
  nombreUsuario: string = "";
  idUsuario: number = 0;

  @Output() buscar = new EventEmitter<string>();
  @Output() filtrarLocalidad = new EventEmitter<string>();
  @Output() filtrarDeporte = new EventEmitter<string>();
  @Output() cargarPistas = new EventEmitter<void>();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.esHome = this.router.url === '/';
    this.logeado = this.authService.isLoggedIn();
    if(this.logeado){
      const usuarioData = localStorage.getItem('usuario');
      if (usuarioData) {
        const usuario = JSON.parse(usuarioData);
        this.nombreUsuario = usuario.nombre;
        this.idUsuario = usuario.id;
      }
    }
  }

  login(){
    this.router.navigate(['/login']);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  buscarClub(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.buscar.emit(input);
  }

  filtrarPorLocalidad(localidad: string){
    this.filtrarLocalidad.emit(localidad);
  }

  filtrarPorDeporte(deporte: string){
    this.filtrarDeporte.emit(deporte);
  }

  allClubs(){
    this.cargarPistas.emit();
  }
}
