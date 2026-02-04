import { Component, OnInit } from '@angular/core';
import { CmsHeaderComponent } from "../cms-header/cms-header.component";
import { CommonModule } from '@angular/common';
import { ReservaService } from '../services/reserva.service';

@Component({
  selector: 'app-cms-reservas',
  standalone: true,
  imports: [CmsHeaderComponent, CommonModule],
  templateUrl: './cms-reservas.component.html',
  styleUrl: './cms-reservas.component.css'
})
export class CmsReservasComponent implements OnInit {
  reservas: any[] = [];
  currentPage: number = 1;
  hasMore: boolean = true;

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.loadReservas();
  }

  loadReservas(): void {
    this.reservaService.getReservas(this.currentPage).subscribe({
      next: (response) => {
        this.reservas = response.reservas;
        this.hasMore = response.currentPage < response.lastPage;
      },
      error: (err) => console.error(err),
    });
  }

  nextPage(): void {
    if (this.hasMore) {
      this.currentPage++;
      this.loadReservas();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadReservas();
    }
  }

  borrarReserva(reservaId: number): void {
    this.reservaService.deleteReserva(reservaId).subscribe({
      next: () => {
        this.loadReservas();
      },
      error: () => {
        alert('Error al borrar la reserva.');
      },
    });
  }
}
