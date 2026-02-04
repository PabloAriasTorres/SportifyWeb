import { Time } from "@angular/common";

export interface Reserva {
    pista_id: number,
    usuario_id: number,
    fecha: Date,
    hora: Time,
    precio: number,
    metodo: string,
    nombre?: string
}

export interface ReservaError{
    error: string,
    estado: boolean
}

export interface ReservaResponse{
    usuarios: Reserva[],
    currentPage: number,
    lastPage: number
}