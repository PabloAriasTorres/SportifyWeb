import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubService } from '../services/club.service';
import { CmsHeaderComponent } from "../cms-header/cms-header.component";

@Component({
  selector: 'app-cms-clubs-modificar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CmsHeaderComponent],
  templateUrl: './cms-clubs-modificar.component.html',
  styleUrl: './cms-clubs-modificar.component.css'
})
export class CmsClubsModificarComponent implements OnInit {
  clubForm!: FormGroup;
  isEditMode = false;
  clubId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clubService: ClubService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.clubId = +id;
        this.loadClub(this.clubId);
      }
    });
  }

  initForm(): void {
    this.clubForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      localidad: ['', Validators.required],
      telefono: [
        '',
        [Validators.required, Validators.pattern(/^\d{9}$/)],
      ]
    });
  }

  loadClub(id: number): void {
    this.clubService.getClub(id).subscribe({
      next: (data: any) => {
        this.clubForm.patchValue(data);
      },
      error: (err) => console.error(err),
    });
  }

  submitForm(): void {
    if (this.clubForm.valid) {
      const formData = new FormData();

      // Añade los valores del formulario
      Object.keys(this.clubForm.controls).forEach((key) => {
        formData.append(key, this.clubForm.get(key)?.value || '');
      });

      if (this.isEditMode && this.clubId) {
        this.clubService.updateClub(this.clubId, formData).subscribe({
          next: () => this.router.navigate(['/cms/clubs']),
          error: () => alert('Error al actualizar el club'),
        });
      } else {
        this.clubService.createClub(formData).subscribe({
          next: () => this.router.navigate(['/cms/clubs']),
          error: () => alert('Error al crear el club'),
        });
      }
    }
  }
}
