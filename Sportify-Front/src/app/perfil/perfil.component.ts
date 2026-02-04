import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { ReservaService } from '../services/reserva.service';
import { UsuarioRegistro } from '../interfaces/usuario';
import { HeaderComponent } from '../header/header.component';
import { Reserva } from '../interfaces/reserva';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FooterComponent],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  usuario: UsuarioRegistro = {
    email: '',
    contrasenya: '',
    nombre: '',
    telefono: '',
  };
  reservas: Reserva[] = [];

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private reservaService: ReservaService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const usuarioId = Number(params.get('id'));
      if (usuarioId && !isNaN(usuarioId)) {
        this.usuarioService.getUsuario(usuarioId).subscribe((response: UsuarioRegistro) => {
          this.usuario = response;
        });

        this.reservaService.getReservasUsuario(usuarioId).subscribe((reservas: Reserva[]) => {
          this.reservas = reservas;
        });
      }
    });
  }
}