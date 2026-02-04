import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubService } from '../services/club.service';
import { DeporteService } from '../services/deporte.service';
import { PistaService } from '../services/pista.service';
import { CmsHeaderComponent } from "../cms-header/cms-header.component";
import { ClubSelect } from '../interfaces/club';

@Component({
  selector: 'app-cms-pistas-modificar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CmsHeaderComponent],
  templateUrl: './cms-pistas-modificar.component.html',
  styleUrl: './cms-pistas-modificar.component.css'
})
export class CmsPistasModificarComponent {
  pistaForm!: FormGroup;
  deportes: { id: number; nombre: string }[] = [];
  clubs: ClubSelect[] = [];
  isEditMode = false;
  imagenError: boolean = false;
  pistaId: number | null = null;
  imagenSeleccionada: File | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clubService: ClubService,
    private deporteService: DeporteService,
    private pistaService: PistaService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDeportes();
    this.loadClubs();

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.pistaId = +id;
        this.loadPista(this.pistaId);
      }
    });
  }

  initForm(): void {
    this.pistaForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      longitud: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      ancho: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      deporte_id: ['', Validators.required],
      club_id: ['', Validators.required],
      imagen: [null]
    });
  }

  loadDeportes(): void {
    this.deporteService.getDeportes().subscribe({
      next: (data) => (this.deportes = data),
      error: (err) => console.error(err),
    });
  }

  loadClubs(): void {
    this.clubService.getClubsInfoCms().subscribe({
      next: (data) => (this.clubs = data),
      error: (err) => console.error(err),
    });
  }

  loadPista(id: number): void {
    this.pistaService.getPista(id).subscribe({
      next: (data: any) => {
        const { imagen, ...datos } = data;
        this.pistaForm.patchValue(datos); // Rellena el formulario con los datos
      },
      error: (err) => console.error(err),
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.pistaForm.get('imagen')?.setValue(file);
      this.imagenError = false;
    }
  }

  submitForm(): void {
    if (this.pistaForm.valid) {
      this.imagenError = false;
      if (!this.pistaForm.get('imagen')?.value) {
        this.imagenError = true;
        return;
      }

      const formData = new FormData();

      // Añade los valores del formulario
      Object.keys(this.pistaForm.controls).forEach((key) => {
        formData.append(key, this.pistaForm.get(key)?.value || '');
      });

      if (this.imagenSeleccionada) {
        formData.append('imagen', this.imagenSeleccionada);
      }
      
      if (this.isEditMode && this.pistaId) {
        this.pistaService.updatePista(this.pistaId, formData).subscribe({
        next: () => this.router.navigate(['/cms/pistas']),
        error: () => alert('Error al actualizar la pista'),
      });
      } else {
        this.pistaService.createPista(formData).subscribe({
          next: () => this.router.navigate(['/cms/pistas']),
          error: () => alert('Error al crear la pista'),
        });
      }
    }
  }

}
