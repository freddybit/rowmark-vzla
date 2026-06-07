import { Component } from '@angular/core';

@Component({
  selector: 'app-role-management.component',
  imports: [],
  templateUrl: './role-management.component.html',
  styleUrl: './role-management.component.css',
})
export class RoleManagementComponent {

  roleList: any[] = [];

  constructor() {
    // Initialize roleList with some dummy data for demonstration purposes
    this.roleList = [
      { id: 1, name: 'Admin', permissions: ['read', 'write', 'delete'], iconUrl: '/assets/icons/admin.svg' },
      { id: 2, name: 'Editor', permissions: ['read', 'write'], iconUrl: '/assets/icons/editor.svg' },
      { id: 3, name: 'Viewer', permissions: ['read'], iconUrl: '/assets/icons/viewer.svg' },
    ];
  }

}
