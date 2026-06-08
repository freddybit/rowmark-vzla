import { Component } from '@angular/core';

@Component({
  selector: 'app-create-role.component',
  imports: [],
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.css',
})
export class CreateRoleComponent {
  permissionsList = [
    {
      name: 'Users',
      desc: 'Manage system user accounts',
      actions: ['View', 'Create', 'Edit', 'Delete'],
    },
    {
      name: 'Roles & Permissions',
      desc: 'Define and assign access levels',
      actions: ['View', 'Create', 'Edit', 'Delete'],
    },
    { name: 'Reports', desc: 'Access system analytics and logs', actions: ['View', 'Export'] },
  ];
}
