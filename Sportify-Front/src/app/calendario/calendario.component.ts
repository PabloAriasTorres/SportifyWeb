import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HorarioService } from '../services/horario.service';
import { DiaHorario, Franja, FranjaSeleccionada, Horario } from '../interfaces/horario';
import { CommonModule, Time } from '@angular/common';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})
export class CalendarioComponent implements OnInit {
  @Input() pistaId!: number;
  @Output() onSeleccionFranja = new EventEmitter<FranjaSeleccionada>();

  diasTotales: DiaHorario[] = [];
  diasFiltrados: DiaHorario[] = [];
  mesesDisponibles: Date[] = [];
  mesActualIndex = 0;

  diaSeleccionado?: DiaHorario;
  franjaSeleccionada?: Franja;

  constructor(private horarioService: HorarioService) {}

  ngOnInit(): void {
    this.cargarDias();
  }

  cargarDias(): void {
    this.horarioService.getHorarioPista(this.pistaId).subscribe((response) => {
      this.diasTotales = this.agruparHorario(response);
      this.mesesDisponibles = this.extraerMeses(this.diasTotales);
      this.actualizarDiasFiltrados();
    });
  }

  agruparHorario(response: Horario[]): DiaHorario[] {
    const mapa = new Map<string, DiaHorario>();

    response.forEach((h) => {
      const fechaDate = new Date(h.fecha);
      const clave = fechaDate.toDateString(); // Se agrupa por día

      // Si no existe el día se crea
      if (!mapa.has(clave)) {
        mapa.set(clave, { fecha: h.fecha, franjas: [] });
      }

      const nuevaFranja: Franja = {
        hora: h.hora,
        reservada: h.reservada,
      };

      // Se meten las franjas horarias al dia
      const dia = mapa.get(clave);
      if (dia) {
        dia.franjas.push(nuevaFranja);
      }
    });
    return Array.from(mapa.values());
  }


  extraerMeses(dias: DiaHorario[]): Date[] {
    const meses = new Set<string>();

    dias.forEach((dia) => {
      const fecha = new Date(dia.fecha);
      const mes = `${fecha.getFullYear()}-${fecha.getMonth()}`;
      meses.add(mes);
    });

    return Array.from(meses)
      .map((mes) => {
        const [year, month] = mes.split('-').map(Number);
        return new Date(year, month); // Crear objeto Date del primer día del mes
      })
      .sort((a, b) => a.getTime() - b.getTime()); // Ordenar por fecha
}


  cambiarMes(direccion: 'anterior' | 'siguiente'): void {
    if (direccion === 'anterior' && this.mesActualIndex > 0) {
      this.mesActualIndex--;
    } else if (direccion === 'siguiente' && this.mesActualIndex < this.mesesDisponibles.length - 1) {
      this.mesActualIndex++;
    }
    this.actualizarDiasFiltrados();
  }

  actualizarDiasFiltrados(): void {
    const mesSeleccionado = this.mesesDisponibles[this.mesActualIndex];
    const inicioMes = new Date(mesSeleccionado.getFullYear(), mesSeleccionado.getMonth(), 1);
    const finMes = new Date(mesSeleccionado.getFullYear(), mesSeleccionado.getMonth() + 1, 0);

    this.diasFiltrados = this.diasTotales.filter(
      (dia) => new Date(dia.fecha) >= inicioMes && new Date(dia.fecha) <= finMes
    );
  }

  toggleDiaSeleccionado(dia: DiaHorario): void {
    if (this.diaSeleccionado?.fecha === dia.fecha) {
      this.diaSeleccionado = undefined;
      this.franjaSeleccionada = undefined;
    } else {
      this.diaSeleccionado = dia;
      this.franjaSeleccionada = undefined;
    }
  }

  seleccionarFranja(fecha: Date, franja: Franja): void {
    if (!franja.reservada) {
      this.franjaSeleccionada = franja;
      this.diaSeleccionado!.fecha = fecha;
    }
  }

  reservarSeleccionada(): void {
    if (this.franjaSeleccionada && this.diaSeleccionado) {
      const franjaRellena: FranjaSeleccionada = {
        fecha: this.diaSeleccionado.fecha,
        hora: this.franjaSeleccionada.hora,
        reservada: this.franjaSeleccionada.reservada,
      };
      this.onSeleccionFranja.emit(franjaRellena);
    }
  }
}
