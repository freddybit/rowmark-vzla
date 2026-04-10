import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileMenu } from "../../../shared/sidebar.component/sidebar.component";
import { FooterComponent } from "../../../shared/footer.component/footer.component";
import { NavbarAdminComponent } from "../../../shared/navbar-admin.component/navbar-admin.component";

@Component({
  selector: 'app-admin-layout.component',
  imports: [RouterOutlet, ProfileMenu, FooterComponent, NavbarAdminComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {}
