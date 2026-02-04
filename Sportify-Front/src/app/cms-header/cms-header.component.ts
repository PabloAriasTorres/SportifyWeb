import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cms-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cms-header.component.html',
  styleUrl: './cms-header.component.css'
})
export class CmsHeaderComponent {
  constructor(private router: Router, private authService: AuthService){}

  logout(){
    this.authService.logoutAdmin();
    this.router.navigate(['/cms']);
  }
}
