import { Time } from "@angular/common";

export interface Horario {
    reservada: boolean,
    fecha: Date,
    hora: Time
}

export interface DiaHorario {
  fecha: Date;
  franjas: Franja[];
}

export interface Franja{
  hora: Time;
  reservada: boolean;
}

export interface FranjaSeleccionada {
  fecha: Date;
  hora: Time;
  reservada: boolean;
}
