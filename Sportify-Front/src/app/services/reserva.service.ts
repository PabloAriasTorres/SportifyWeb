import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva, ReservaResponse } from '../interfaces/reserva';
import { AppConfig } from '../../app-config';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = AppConfig.apiUrl;
  constructor(private http: HttpClient) {}

  storeReserva(reserva: Reserva): Observable<any>{
    return this.http.post<Reserva>(`${this.apiUrl}/reservar`,reserva);
  }

  getReservas(page: number = 1): Observable<any>{
    return this.http.get<ReservaResponse[]>(`${this.apiUrl}/reservas?page=${page}`);
  }

  getEstadisticasReservas(): Observable<any>{
    return this.http.get<Reserva[]>(`${this.apiUrl}/getEstadisticasReservas`);
  }

  getReservasUsuario(idUsuario: number): Observable<any>{
    return this.http.get<Reserva[]>(`${this.apiUrl}/reservas/${idUsuario}`);
  }

  deleteReserva(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/reserva/${id}`);
  }
}
