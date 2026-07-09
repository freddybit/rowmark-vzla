import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlaceService } from '../../../services/rowmark-api/place-service/place.interface';
import { AuthService } from '../../../services/rowmark-api/auth-service/auth.service';
import { Place } from '../../../models/entities/place';
import { ReadProfileDTO } from '../../../models/dtos/read-profile.dto'; // <-- Importar el DTO

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent implements OnInit {
  private placeService = inject(PlaceService);
  private authService = inject(AuthService);

  lugares: Place[] = [];

  @Input() userToEdit: ReadProfileDTO | null = null;

  nuevoUsuario = {
    id: 1,
    firstName: '',
    secondName: '',
    firstLastName: '',
    secondLastName: '',
    place_PlaceKey: 1,
    email: '',
    password: '',
    confirmPassword: '',
  };

  @Output() onClose = new EventEmitter<void>();
  @Output() onUserCreated = new EventEmitter<void>();

  ngOnInit(): void {
    this.cargarLugares();

    if (this.userToEdit) {
      this.nuevoUsuario = {
        id: this.userToEdit.id,
        firstName: this.userToEdit.firstName,
        secondName: this.userToEdit.secondName || '', // Previniendo nulos
        // Asegúrate de que las propiedades coincidan con las de tu ReadProfileDTO
        firstLastName: (this.userToEdit as any).firstLastname || '',
        secondLastName: (this.userToEdit as any).secondLastname || '',
        place_PlaceKey: (this.userToEdit as any).place_PlaceKey || 1,
        email: this.userToEdit.email,
        password: '', // Lo dejamos en blanco por seguridad
        confirmPassword: '',
      };
    }
  }

  cargarLugares() {
    this.placeService.getAll().subscribe({
      next: (data) => (this.lugares = data),
      error: (err) => console.error('Error al cargar lugares:', err),
    });
  }

  cerrar() {
    this.onClose.emit();
  }

  guardar() {
    const isEditing = !!this.userToEdit;

    if (
      !this.nuevoUsuario.id ||
      !this.nuevoUsuario.firstName ||
      !this.nuevoUsuario.firstLastName ||
      !this.nuevoUsuario.email ||
      !this.nuevoUsuario.place_PlaceKey ||
      (!isEditing && !this.nuevoUsuario.password)
    ) {
      alert('Por favor, completa los campos requeridos (*).');
      return;
    }

    if (this.nuevoUsuario.password || this.nuevoUsuario.confirmPassword) {
      if (this.nuevoUsuario.password !== this.nuevoUsuario.confirmPassword) {
        alert('Las contraseñas no coinciden. Por favor, verifica.');
        return;
      }
    }

    if (isEditing) {
      this.authService.updateProfile(this.userToEdit!.id, this.nuevoUsuario).subscribe({
        next: (response) => {
          alert('Usuario actualizado exitosamente.');
          this.onUserCreated.emit();
          this.cerrar();
        },
        error: (err) => {
          console.error('Fallo al actualizar usuario:', err);
          alert('Ocurrió un error al actualizar. Revisa la consola.');
        },
      });
    } else {
      // MODO CREACIÓN
      this.authService.register(this.nuevoUsuario).subscribe({
        next: (response) => {
          alert('Usuario creado exitosamente.');
          this.onUserCreated.emit();
          this.cerrar();
        },
        error: (err) => {
          console.error('Fallo al registrar usuario:', err);
          alert('Ocurrió un error al registrar el usuario.');
        },
      });
    }
  }
}
