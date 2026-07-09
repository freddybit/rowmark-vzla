import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CapabilityService,
  Capability,
} from '../../../services/rowmark-api/capability-service/capability.service';
import {
  DynamicModalComponent,
  DynamicField,
} from '../dynamic-modal.component/dynamic-modal.component';
import { SupabaseService } from '../../../services/supabase-service/supabase.service';
import {
  FlexRenderDirective,
  createAngularTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/angular-table';

@Component({
  selector: 'app-capability-management',
  standalone: true,
  imports: [CommonModule, FlexRenderDirective, DynamicModalComponent],
  templateUrl: './capability-management.component.html',
  styleUrls: ['./capability-management.component.css'],
})
export class CapabilityManagementComponent implements OnInit {
  private capabilityService = inject(CapabilityService);
  private supabaseService = inject(SupabaseService);

  // 👇 1. Variables reactivas con Signals
  public capabilities = signal<Capability[]>([]);
  public globalFilter = signal<string>('');

  public selectedCapability: Capability | null = null;

  // --- VARIABLES DEL MODAL DINÁMICO ---
  public isModalOpen = false;
  public modalTitle = 'Agregar Capacidad';
  public capabilityToEdit: any = {};

  public modalConfigCapability: DynamicField[] = [
    {
      key: 'name',
      label: 'Nombre de la Capacidad',
      type: 'text',
      required: true,
      placeholder: 'Ej: Grabado Láser',
    },
    {
      key: 'category',
      label: 'Categoría',
      type: 'text',
      required: true,
      placeholder: 'Ej: Uso Interior / Exterior',
    },
    {
      key: 'description',
      label: 'Descripción',
      type: 'textarea',
      placeholder: 'Detalles de la capacidad...',
    },
    {
      key: 'imgUrl',
      label: 'Imagen Representativa',
      type: 'file',
      accept: 'image/png, image/jpeg, image/webp',
    },
  ];

  // 👇 2. La tabla lee los Signals invocándolos con paréntesis ()
  table = createAngularTable(() => ({
    data: this.capabilities(),
    columns: [
      { accessorKey: 'capabilityKey', header: 'ID' },
      { accessorKey: 'name', header: 'Nombre' },
      { accessorKey: 'category', header: 'Categoría' },
    ],
    state: {
      globalFilter: this.globalFilter(),
    },
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  }));

  ngOnInit(): void {
    this.loadCapabilities();
  }

  public loadCapabilities(): void {
    this.capabilityService.getAll().subscribe({
      next: (data) => {
        // 👇 3. Seteamos la data; la tabla reacciona automáticamente
        this.capabilities.set(data);
      },
      error: (err) => console.error('Error:', err),
    });
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    // 👇 4. Actualizamos el filtro de forma reactiva
    this.globalFilter.set(value);
  }

  selectCapability(capability: Capability): void {
    this.selectedCapability = capability;
  }

  deselectCapability(): void {
    this.selectedCapability = null;
  }

  deleteCapability(capabilityKey: number | undefined): void {
    if (!capabilityKey) return;

    if (confirm('¿Estás seguro de que deseas eliminar esta capacidad?')) {
      this.capabilityService.delete(capabilityKey).subscribe({
        next: () => {
          // 👇 5. Actualizamos el Signal filtrando el eliminado
          this.capabilities.update((prev) => prev.filter((c) => c.capabilityKey !== capabilityKey));

          if (this.selectedCapability?.capabilityKey === capabilityKey) {
            this.deselectCapability();
          }
        },
        error: (err) => console.error('Error al eliminar:', err),
      });
    }
  }

  // --- MÉTODOS PARA CONTROLAR EL MODAL Y SUPABASE ---

  openCreateModal() {
    this.modalTitle = 'Agregar Nueva Capacidad';
    this.capabilityToEdit = {};
    this.isModalOpen = true;
  }

  openEditModal() {
    this.modalTitle = 'Modificar Capacidad';
    this.capabilityToEdit = { ...this.selectedCapability };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async saveCapability(formData: any) {
    if (formData.imgUrl instanceof File) {
      const archivoImagen: File = formData.imgUrl;

      try {
        console.log('Subiendo archivo a Supabase...', archivoImagen.name);

        const urlSupabase = await this.supabaseService.uploadImage(
          archivoImagen,
          'rowmark-product-img',
        );

        console.log('¡Imagen subida! URL:', urlSupabase);
        formData.imgUrl = urlSupabase;
      } catch (error) {
        console.error('Error de Supabase:', error);
        alert('Fallo al subir la imagen. Revisa la consola.');
        return;
      }
    }

    if (formData.capabilityKey) {
      this.capabilityService.update(formData.capabilityKey, formData).subscribe({
        next: () => {
          alert('Capacidad actualizada correctamente.');
          this.loadCapabilities();
          this.selectedCapability = formData;
          this.closeModal();
        },
        error: (err) => console.error('Error al actualizar:', err),
      });
    } else {
      this.capabilityService.create(formData).subscribe({
        next: () => {
          alert('Capacidad creada exitosamente.');
          this.loadCapabilities();
          this.closeModal();
        },
        error: (err) => console.error('Error al crear:', err),
      });
    }
  }
}
