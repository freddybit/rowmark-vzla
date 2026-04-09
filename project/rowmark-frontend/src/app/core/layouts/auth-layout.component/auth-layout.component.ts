import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "../../../shared/navbar.component/navbar.component";
import { FooterComponent } from "../../../shared/footer.component/footer.component";

@Component({
  selector: 'app-auth-layout.component',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {

}
