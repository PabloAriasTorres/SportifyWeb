import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PistaService } from '../services/pista.service';
import { Pista, PistaResponse } from '../interfaces/pista';
import { Router } from '@angular/router';
import { CmsHeaderComponent } from "../cms-header/cms-header.component";

@Component({
  selector: 'app-cms-pistas',
  standalone: true,
  imports: [CommonModule, CmsHeaderComponent],
  templateUrl: './cms-pistas.component.html',
  styleUrl: './cms-pistas.component.css'
})
export class CmsPistasComponent {
  pistas: Pista[] = [];
  currentPage: number = 1;
  hasMore: boolean = true;

  constructor(private pistaService: PistaService, private router: Router) {}

  ngOnInit(): void {
    this.loadPistas();
  }

  loadPistas(): void {
    this.pistaService.getPistas(this.currentPage).subscribe((response: PistaResponse)=> {
      this.pistas = response.pistas;
      this.hasMore = response.currentPage < response.lastPage;
    });
  }

  nextPage(): void {
    if (this.hasMore) {
      this.currentPage++;
      this.loadPistas();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPistas();
    }
  }

  editarPista(pistaId: number): void {
    this.router.navigate([`/cms/pistas/editar/${pistaId}`]);
  }

  crearPista(): void {
     this.router.navigate(['/cms/pistas/crear']);
  }

  borrarPista(id:number){
    this.pistaService.deletePista(id).subscribe({
      next: (data) => (this.loadPistas()),
      error: (err) => alert("Error al intentar borrar la pista"),
    });
  }
}
