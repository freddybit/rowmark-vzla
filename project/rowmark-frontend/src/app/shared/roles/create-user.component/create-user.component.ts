import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  imports: [FormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent {
  nuevoUsuario = {
    firstName: '',
    lastName: '',
    email: '',
    roleId: '',
  };

  // 1. Creamos los emisores de eventos para comunicarnos con el Padre
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<any>();

  // 2. Método para emitir el cierre
  cerrar() {
    this.onClose.emit(); // Le avisa al padre que se quiere cerrar
  }

  // 3. Método para emitir que se quiere guardar
  guardar() {
    if (!this.nuevoUsuario.firstName || !this.nuevoUsuario.email || !this.nuevoUsuario.roleId) {
      alert('Por favor, completa los campos requeridos (Nombre, Email y Rol).');
      return;
    }

    // Le enviamos los datos del formulario al padre
    this.onSave.emit(this.nuevoUsuario);
  }
}
