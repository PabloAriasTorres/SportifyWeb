import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Club, ClubCms, ClubSelect } from '../interfaces/club';
import { AppConfig } from '../../app-config';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  private apiUrl = AppConfig.apiUrl;
  constructor(private http: HttpClient) {}

  getClubsHome(): Observable<any>{
    return this.http.get<Club[]>(`${this.apiUrl}/clubsHome`);
  }

  getClubsByDeporte(deporte: String): Observable<any>{
    return this.http.get<Club[]>(`${this.apiUrl}/byDeporte/${deporte}`);
  }

  getClubsByLocalidad(localidad: String): Observable<any>{
    return this.http.get<Club[]>(`${this.apiUrl}/byLocalidad/${localidad}`);
  }

  searchClubs(searchTerm: String): Observable<any>{
    return this.http.get<Club[]>(`${this.apiUrl}/bySearch/${searchTerm}`);
  }

  getClubs(page: number = 1): Observable<any>{
    return this.http.get<ClubCms[]>(`${this.apiUrl}/clubs?page=${page}`);
  }

  getClub(id: number): Observable<any>{
    return this.http.get<ClubCms>(`${this.apiUrl}/club/${id}`);
  }

  deleteClub(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/club/${id}`);
  }

  createClub(formData: FormData): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/club`, formData);
  }

  updateClub(id: number, formData: FormData): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/club/${id}`, formData);
  }

  getClubsInfoCms(): Observable<Pick<Club, 'cId' | 'cNombre'>[]> {
    return this.http.get<ClubSelect[]>(`${this.apiUrl}/clubsInfoCms`);
  }
}
