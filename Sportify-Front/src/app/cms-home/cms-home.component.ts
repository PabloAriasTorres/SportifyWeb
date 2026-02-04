import { Component, OnInit } from '@angular/core';
import { CmsHeaderComponent } from "../cms-header/cms-header.component";
import { ReservaService } from '../services/reserva.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cms-home',
  standalone: true,
  imports: [CmsHeaderComponent, CommonModule],
  templateUrl: './cms-home.component.html',
  styleUrl: './cms-home.component.css'
})
export class CmsHomeComponent implements OnInit {
  totales: { totalReservas: number; totalDinero: number } | null = null;
  desglosePorMetodo: { metodo: string; totalReservasPorMetodo: number; totalDineroPorMetodo: number }[] = [];

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    this.reservaService.getEstadisticasReservas().subscribe({
      next: (data) => {
        this.totales = data.totales;
        this.desglosePorMetodo = data.metodos;
      },
      error: (err) => console.error(err),
    });
  }
}
