import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Club } from '../interfaces/club';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from '../calendario/calendario.component';
import { FranjaSeleccionada, Horario } from '../interfaces/horario';
import { ReservaService } from '../services/reserva.service';
import { Reserva, ReservaError } from '../interfaces/reserva';
import Swal from 'sweetalert2';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { AuthService } from '../services/auth.service';
import { PistaService } from '../services/pista.service';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, CalendarioComponent, HeaderComponent, FooterComponent],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit {
  infoDetalle: Club = {
    cId: 0,
    dDireccion: '',
    cNombre: '',
    pNombre: '',
    pId: 0,
    dNombre: '',
    pImagen: '',
    pPrecio: 0
  };
  showModal = false;
  metodosPago = ['PayPal', 'Tarjeta', 'Bizum'];
  metodoSeleccionado: string | null = null;

  reservaSeleccionada: FranjaSeleccionada | null = null;

  constructor(private route: ActivatedRoute, private reservaService: ReservaService, 
    private authService: AuthService, private pistaService: PistaService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const pistaId = Number(params.get('id'));
      if (pistaId && !isNaN(pistaId)) {
        this.pistaService.getPistaDetalle(pistaId).subscribe((response: Club) => {
          this.infoDetalle = response;
        });
      }
    });
  }

  abrirReserva(reserva: FranjaSeleccionada) {
    if(this.authService.isLoggedIn()){
      this.reservaSeleccionada = reserva;
      this.showModal = true;
      this.metodoSeleccionado = null;
    }else{
      Swal.fire({
        title: 'Error al reservar',
        text: 'Necesitas estar logeado',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
    }
  }

  closeModal(): void {
    this.showModal = false;
  }  
  
  seleccionarMetodo(metodo: string) {
    this.metodoSeleccionado = metodo;
  }
  
  pagar() {
    let reserva: Reserva = {
      pista_id: this.infoDetalle.pId,
      usuario_id: 1,
      fecha: this.reservaSeleccionada!.fecha,
      hora: this.reservaSeleccionada!.hora,
      precio: this.infoDetalle.pPrecio,
      metodo: this.metodoSeleccionado!
    };

    const usuarioData = localStorage.getItem('usuario');
    if (usuarioData) {
      const usuario = JSON.parse(usuarioData);
      reserva.usuario_id = usuario.id;
    }

    this.reservaService.storeReserva(reserva).subscribe((response: ReservaError) => {
      if(response.estado){
        this.showModal = false;
        window.location.reload();
      }else{
        Swal.fire({
          title: 'Error al reservar',
          text: response.error,
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
    });
  }
}
