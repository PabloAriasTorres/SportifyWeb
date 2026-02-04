import { Injectable } from '@angular/core';
import { Pista } from '../interfaces/pista';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../app-config';

@Injectable({
  providedIn: 'root'
})
export class PistaService {
  private apiUrl = AppConfig.apiUrl;
  constructor(private http: HttpClient) {}

  getPistas(page: number = 1): Observable<any>{
    return this.http.get<Pista[]>(`${this.apiUrl}/pistas?page=${page}`);
  }

  getPista(id: number): Observable<any>{
    return this.http.get<Pista>(`${this.apiUrl}/pista/${id}`);
  }

  getPistaDetalle(id: number): Observable<any>{
    return this.http.get<Pista>(`${this.apiUrl}/pistaDetalle/${id}`);
  }

  deletePista(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/pista/${id}`);
  }

  createPista(formData: FormData): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/pista`, formData);
  }

  updatePista(id: number, formData: FormData): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/pista/${id}`, formData);
  }
}
