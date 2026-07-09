import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/rowmark-api/auth-service/auth.service';
import { PlaceService } from '../../../services/rowmark-api/place-service/place.interface'; // <-- Ajusta la ruta si es necesario
import { Place } from '../../../models/entities/place';

@Component({
  selector: 'app-my-profile-header',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './my-profile-header.component.html',
  styleUrl: './my-profile-header.component.css',
})
export class MyProfileHeaderComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private placeService = inject(PlaceService);

  userCedula: number = 0;
  userName: string = 'Cargando...';
  userEmail: string = 'Cargando...';
  roles: string[] = ['Usuario'];
  roleDescription: string = 'Usuario registrado en Rowmark Vzla.';

  isEditModalOpen: boolean = false;
  profileKey: number = 0;
  lugares: Place[] = [];

  // El combo completo de datos
  editData = {
    firstName: '',
    secondName: '',
    firstLastName: '',
    secondLastName: '',
    email: '',
    place_PlaceKey: 1,
    password: '',
    confirmPassword: '',
  };

  ngOnInit(): void {
    this.loadUserData();
    this.cargarLugares();
  }

  cargarLugares(): void {
    this.placeService.getAll().subscribe({
      next: (data) => {
        this.lugares = data;
      },
      error: (err) => {
        console.error('Error al cargar lugares:', err);
      },
    });
  }

loadUserData(): void {
    const user = localStorage.getItem('currentUser');

    if (user) {
        const userData = JSON.parse(user);

      this.profileKey = userData.profileKey;
      this.userCedula = userData.id;
      this.userName = userData.firstName + ' ' + userData.firstLastname;
      this.userEmail = userData.email;

      this.editData.firstName = userData.firstName || '';
      this.editData.secondName = userData.secondName || '';

      // Ojo aquí: asegúrate de que haga match con cómo lo guarda tu DTO en el localStorage
      this.editData.firstLastName = userData.firstLastname || '';
      this.editData.secondLastName = userData.secondLastname || '';

      this.editData.email = userData.email || '';
      this.editData.place_PlaceKey = userData.place_PlaceKey || 1;

      // Se dejan en blanco por seguridad, solo se envían si el usuario escribe algo
      this.editData.password = '';
      this.editData.confirmPassword = '';
    }
  }

  openEditModal(event: Event): void {
    event.preventDefault();
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.loadUserData();
  }

  saveProfile(): void {
    // Validación de campos obligatorios
    if (
      !this.editData.firstName ||
      !this.editData.firstLastName ||
      !this.editData.email ||
      !this.editData.place_PlaceKey
    ) {
      alert('Por favor, completa los campos requeridos (*).');
      return;
    }

    // Validación de contraseñas si intentan cambiarla
    if (this.editData.password || this.editData.confirmPassword) {
      if (this.editData.password !== this.editData.confirmPassword) {
        alert('Las contraseñas no coinciden. Por favor, verifica.');
        return;
      }
    }

this.authService.updateProfile(this.userCedula, this.editData).subscribe({
  next: (response) => {
    alert('Perfil actualizado exitosamente.');
    const user = localStorage.getItem('currentUser');

    if (user) {
      const userData = JSON.parse(user);
      userData.firstName = this.editData.firstName;
      userData.secondName = this.editData.secondName;
      userData.firstLastname = this.editData.firstLastName;
      userData.secondLastname = this.editData.secondLastName;
      userData.email = this.editData.email;
      userData.place_PlaceKey = this.editData.place_PlaceKey;

      localStorage.setItem('currentUser', JSON.stringify(userData));
    }

    this.loadUserData();
    this.closeEditModal();
  },
  error: (err) => {
    console.error('Fallo al actualizar perfil:', err);
    alert('Ocurrió un error al actualizar. Revisa la consola.');
  },
});
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/private']);
  }
}
