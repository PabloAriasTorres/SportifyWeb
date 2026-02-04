import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deporte } from '../interfaces/deporte';
import { AppConfig } from '../../app-config';

@Injectable({
  providedIn: 'root'
})
export class DeporteService {
  private apiUrl = AppConfig.apiUrl;
  constructor(private http: HttpClient) {}

  getDeportes(): Observable<any>{
    return this.http.get<Deporte[]>(`${this.apiUrl}/deportes`);
  }
}
