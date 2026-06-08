import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-role-management.component',
  imports: [RouterLink],
  templateUrl: './role-management.component.html',
  styleUrl: './role-management.component.css',
})
export class RoleManagementComponent {

  roleList: any[] = [];

  constructor() {
    // Initialize roleList with some dummy data for demonstration purposes
    this.roleList = [
      {
        id: 1,
        name: 'Administrador',
        permissions: ['read', 'write', 'delete'],
        iconUrl: 'img/role-icons/database.svg',
      },
      {
        id: 2,
        name: 'Editor',
        permissions: ['read', 'write'],
        iconUrl: 'img/role-icons/database.svg',
      },
      {
        id: 3,
        name: 'Viewer',
        permissions: ['read'],
        iconUrl: 'img/role-icons/database.svg',
      },
    ];
  }

}
