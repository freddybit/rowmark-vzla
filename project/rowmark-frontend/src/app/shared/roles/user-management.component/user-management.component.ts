import { Component } from '@angular/core';
import { ReadProfileDTO } from '../../../models/dtos/read-profile.dto';
import { CreateUserComponent } from "../create-user.component/create-user.component";

@Component({
  selector: 'app-user-management.component',
  imports: [CreateUserComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent {
  userList: ReadProfileDTO[] = [
    {
      profileKey: 1,
      id: 1,
      firstName: 'John',
      secondName: 'Doe',
      lastName: 'Smith',
      secondLastName: 'Johnson',
      email: 'john.doe@example.com',
      roles: [
        {
          roleKey: 0,
          name: 'Admin',
          description: 'Full access to all system features and settings',
          permissions: [],
        },
      ],
    },
    {
      profileKey: 2,
      id: 2,
      firstName: 'Jane',
      secondName: 'Doe',
      lastName: 'Williams',
      secondLastName: 'Brown',
      email: 'jane.doe@example.com',
      roles: [
        {
          roleKey: 1,
          name: 'User',
          description: 'Standard user access with limited privileges',
          permissions: [],
        },
      ],
    },
    {
      profileKey: 3,
      id: 3,
      firstName: 'Alice',
      secondName: 'Smith',
      lastName: 'Johnson',
      secondLastName: 'Davis',
      email: 'alice.smith@example.com',
      roles: [
        {
          roleKey: 2,
          name: 'Editor',
          description: 'Can edit content but not delete',
          permissions: [],
        },
      ],
    },
  ];

  isModalOpen: boolean = false;

  abrirModal() {
    this.isModalOpen = true;
  }

  cerrarModal() {
    this.isModalOpen = false;
  }

  // Este método RECIBE los datos que escupe el modal
  guardarNuevoUsuario(datosDelModal: any) {
    console.log('Datos recibidos desde el modal:', datosDelModal);

    // Aquí llamas a tu backend...
    // this.userService.create(datosDelModal).subscribe(...)

    // Y cerramos el modal
    this.cerrarModal();
  }

}
