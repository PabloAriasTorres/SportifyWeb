import { Component } from '@angular/core';
import { Club } from '../interfaces/club';
import { ClubService } from '../services/club.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  clubs: Club[] = [];
  emptyResponse: boolean = false;

  constructor(private clubService: ClubService, private router: Router) {}

  ngOnInit() {
    this.allClubs();
  }

  filtrarPorLocalidad(localidad: String){
    this.clubService.getClubsByLocalidad(localidad).subscribe((response: Club[])=> {
      this.emptyResponse = false;
      this.clubs = response;
    });
  }

  filtrarPorDeporte(deporte: String){
    this.clubService.getClubsByDeporte(deporte).subscribe((response: Club[])=> {
      this.emptyResponse = false;
      this.clubs = response;
    });
  }

  login(){
    this.router.navigate(['/login']);
  }

  buscarClub(busqueda: string){
    if (busqueda) {
      this.clubService.searchClubs(busqueda).subscribe((response: Club[]) => {
          if(response.length == 0){
            this.emptyResponse = true;
            this.clubs = [];
          }else {
            this.emptyResponse = false;
            this.clubs = response;
          }
        }
      );
    }else {
      this.allClubs();
    }
  }

  allClubs(){
    this.clubService.getClubsHome().subscribe((response: Club[])=> {
      this.emptyResponse = false;
      this.clubs = response;
    });
  }
}
