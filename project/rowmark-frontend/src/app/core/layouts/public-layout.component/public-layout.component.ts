import { Component } from '@angular/core';
import { NavbarComponent } from "../../../shared/public-layout/navbar.component/navbar.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../../shared/footer.component/footer.component";

@Component({
  selector: 'app-public-layout',
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css',
})
export class PublicLayoutComponent {

}
