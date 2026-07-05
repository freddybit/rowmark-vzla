import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-profile-header',
  imports: [RouterLink],
  templateUrl: './my-profile-header.component.html',
  styleUrl: './my-profile-header.component.css',
})
export class MyProfileHeaderComponent implements OnInit {
  userName: string = 'Cargando...';
  userEmail: string = 'Cargando...';
  roles: string[] = ['Usuario'];
  roleDescription: string = 'Cargando perfil...';

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData = JSON.parse(user);
      this.userName = userData.firstName + ' ' + userData.firstLastname;
      this.userEmail = userData.email;
      this.roles = ['Usuario'];
      this.roleDescription = 'Usuario registrado en Rowmark Vzla.';
    }
  }

}
