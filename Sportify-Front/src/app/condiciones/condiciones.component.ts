import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-condiciones',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './condiciones.component.html',
  styleUrl: './condiciones.component.css'
})
export class CondicionesComponent {

}
