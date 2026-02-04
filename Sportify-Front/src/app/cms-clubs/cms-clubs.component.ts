import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClubCms, ClubResponse } from '../interfaces/club';
import { ClubService } from '../services/club.service';
import { CmsHeaderComponent } from "../cms-header/cms-header.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cms-clubs',
  standalone: true,
  imports: [CommonModule, CmsHeaderComponent],
  templateUrl: './cms-clubs.component.html',
  styleUrl: './cms-clubs.component.css'
})
export class CmsClubsComponent {
  clubs: ClubCms[] = [];
  currentPage: number = 1;
  hasMore: boolean = true;

  constructor(private clubService: ClubService, private router: Router) {}

  ngOnInit(): void {
    this.loadClubs();
  }

  loadClubs(): void {
    this.clubService.getClubs(this.currentPage).subscribe((response: ClubResponse) => {
      this.clubs = response.clubs;
      this.hasMore = response.currentPage < response.lastPage;
    });
  }

  nextPage(): void {
    if (this.hasMore) {
      this.currentPage++;
      this.loadClubs();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadClubs();
    }
  }

  editarClub(clubId: number): void {
    this.router.navigate([`/cms/clubs/editar/${clubId}`]);
  }

  crearClub(): void {
    this.router.navigate(['/cms/clubs/crear']);
  }

  borrarClub(id: number): void {
    this.clubService.deleteClub(id).subscribe({
      next: () => this.loadClubs(),
      error: (err) => alert("Error al intentar borrar el club"),
    });
  }
}
