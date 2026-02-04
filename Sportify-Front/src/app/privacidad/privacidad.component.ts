import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-privacidad',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './privacidad.component.html',
  styleUrl: './privacidad.component.css'
})
export class PrivacidadComponent {

}
