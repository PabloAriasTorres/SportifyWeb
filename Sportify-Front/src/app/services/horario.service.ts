import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Horario } from '../interfaces/horario';
import { AppConfig } from '../../app-config';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private apiUrl = AppConfig.apiUrl;
  
  constructor(private http: HttpClient) {}

  getHorarioPista(pistaId: number): Observable<any>{
    return this.http.get<Horario[]>(`${this.apiUrl}/horario/${pistaId}`);
  }
}