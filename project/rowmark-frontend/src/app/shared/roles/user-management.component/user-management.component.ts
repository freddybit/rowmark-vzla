import { Component, OnInit, signal, WritableSignal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadProfileDTO } from '../../../models/dtos/read-profile.dto';
import { CreateUserComponent } from '../create-user.component/create-user.component';
import { AuthService } from '../../../services/rowmark-api/auth-service/auth.service';
import {
  createAngularTable,
  FlexRenderDirective,
  getCoreRowModel,
  getPaginationRowModel, // <-- Importante para paginar
  getFilteredRowModel, // <-- Importante para el buscador
  ColumnDef,
} from '@tanstack/angular-table';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, CreateUserComponent, FlexRenderDirective],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
export class UserManagementComponent implements OnInit {
  private authService = inject(AuthService);
  selectedUserToEdit: ReadProfileDTO | null = null;

  isModalOpen: boolean = false;

  // Signals para la data y el buscador
  data: WritableSignal<ReadProfileDTO[]> = signal([]);
  globalFilter: WritableSignal<string> = signal('');

  // Definición de las columnas
  columns: ColumnDef<ReadProfileDTO>[] = [
    {
      id: 'documento',
      header: 'Cédula / ID',
      accessorKey: 'id',
    },
    {
      id: 'nombre',
      header: 'Nombre Completo',
      accessorFn: (row) =>
        `${row.firstName} ${row.secondName} ${row.firstLastname} ${row.secondLastname}`,
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email',
    },
    {
      id: 'acciones',
      header: 'Acciones',
      accessorFn: (row) => row.profileKey,
    },
  ];

  // Instanciamos la tabla de TanStack con superpoderes (Paginación y Filtro)
  table = createAngularTable(() => ({
    data: this.data(),
    columns: this.columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Activa paginación
    getFilteredRowModel: getFilteredRowModel(), // Activa búsqueda global
    state: {
      globalFilter: this.globalFilter(),
    },
    onGlobalFilterChange: (updaterOrValue) => {
      typeof updaterOrValue === 'function'
        ? this.globalFilter.update(updaterOrValue)
        : this.globalFilter.set(updaterOrValue);
    },
  }));

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.authService.getAllProfiles().subscribe({
      next: (users) => {
        this.data.set(users);
      },
      error: (err) => console.error('Error cargando usuarios:', err),
    });
  }

  eliminarUsuario(profileKey: number) {
    if (confirm('¿Estás seguro que deseas eliminar este usuario de forma permanente?')) {
      this.authService.deleteProfile(profileKey).subscribe({
        next: () => {
          // Filtramos la tabla localmente sacando el ID eliminado
          this.data.update((users) => users.filter((u) => u.profileKey !== profileKey));
          alert('Usuario eliminado correctamente.');
        },
        error: (err) => {
          console.error('No se pudo eliminar el usuario:', err);
          alert('Hubo un error al eliminar el usuario.');
        },
      });
    }
  }

  abrirModal() {
    this.selectedUserToEdit = null; // Nos aseguramos de que esté limpio para crear
    this.isModalOpen = true;
  }

  editarUsuario(profileKey: number) {
    // 1. Buscamos el usuario exacto en nuestra señal de data
    const user = this.data().find((u) => u.profileKey === profileKey);

    if (user) {
      this.selectedUserToEdit = user; // 2. Lo guardamos en la variable
      this.isModalOpen = true; // 3. Abrimos el modal
    }
  }

  cerrarModal() {
    this.isModalOpen = false;
  }

  actualizarFiltro(event: Event) {
    const input = event.target as HTMLInputElement;
    this.globalFilter.set(input.value);
  }
}
