import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Finish } from '../../../models/entities/finish';
import { FinishService } from '../../../services/rowmark-api/finish-service/finish.service';
import { DynamicModalComponent, DynamicField } from '../dynamic-modal.component/dynamic-modal.component';
import { SupabaseService } from '../../../services/supabase-service/supabase.service';
import {
  FlexRenderDirective,
  createAngularTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
} from '@tanstack/angular-table';

@Component({
  selector: 'app-finish-management',
  standalone: true,
  imports: [CommonModule, FlexRenderDirective, DynamicModalComponent],
  templateUrl: './finish-management.component.html',
  styleUrl: './finish-management.component.css',
})
export class FinishManagementComponent implements OnInit {
  private finishService = inject(FinishService);
  private supabaseService = inject(SupabaseService); // Inyectamos Supabase

  public finishes = signal<Finish[]>([]);
  public selectedFinish: Finish | null = null;
  public globalFilter = signal<string>('');
  public sorting = signal<SortingState>([]);

  // --- VARIABLES DEL MODAL DINÁMICO ---
  public isModalOpen = false;
  public modalTitle = 'Agregar Acabado';
  public finishToEdit: any = {};

  // 👇 Configuración exacta para crear/editar un Acabado
  public modalConfigFinish: DynamicField[] = [
    {
      key: 'name',
      label: 'Nombre del Acabado',
      type: 'text',
      required: true,
      placeholder: 'Ej: Mate, Brillante, Cepillado',
    },
    {
      key: 'description',
      label: 'Descripción',
      type: 'textarea',
      placeholder: 'Detalles del acabado...',
    },
    {
      key: 'imgUrl',
      label: 'Imagen de Muestra',
      type: 'file',
      accept: 'image/png, image/jpeg, image/webp',
    },
  ];

  table = createAngularTable(() => ({
    data: this.finishes(),
    columns: [
      { accessorKey: 'finishKey', header: 'ID' },
      { accessorKey: 'name', header: 'Nombre' },
    ],
    state: {
      globalFilter: this.globalFilter(),
      sorting: this.sorting(),
    },
    onSortingChange: (updater) => {
      if (typeof updater === 'function') this.sorting.update(updater);
      else this.sorting.set(updater);
    },
    initialState: {
      pagination: {
        pageSize: 7,
        pageIndex: 0,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  }));

  ngOnInit(): void {
    this.loadFinishes();
  }

  public loadFinishes(): void {
    this.finishService.getAll().subscribe({
      next: (data) => {
        this.finishes.set(data);
      },
      error: (err) => console.error('Error al cargar acabados:', err),
    });
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.globalFilter.set(value);
  }

  selectFinish(finish: Finish): void {
    this.selectedFinish = finish;
  }

  deselectFinish(): void {
    this.selectedFinish = null;
  }

  deleteFinish(finishKey: number | undefined): void {
    if (!finishKey) return;

    if (confirm('¿Estás seguro de que deseas eliminar este acabado?')) {
      this.finishService.delete(finishKey).subscribe({
        next: () => {
          this.finishes.update((prev) => prev.filter((f) => f.finishKey !== finishKey));

          if (this.selectedFinish?.finishKey === finishKey) {
            this.deselectFinish();
          }
        },
        error: (err) => console.error('Error al eliminar:', err),
      });
    }
  }

  // --- MÉTODOS PARA CONTROLAR EL MODAL Y SUPABASE ---

  openCreateModal() {
    this.modalTitle = 'Agregar Nuevo Acabado';
    this.finishToEdit = {}; // Limpiamos para crear desde cero
    this.isModalOpen = true;
  }

  openEditModal() {
    this.modalTitle = 'Modificar Acabado';
    this.finishToEdit = { ...this.selectedFinish }; // Pasamos los datos actuales
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // 👇 Guardamos imagen en Supabase y luego en PostgreSQL
  async saveFinish(formData: any) {
    if (formData.imgUrl instanceof File) {
      const archivoImagen: File = formData.imgUrl;
      try {
        console.log('Subiendo archivo a Supabase...', archivoImagen.name);

        // Asumiendo que sigues usando 'rowmark-product-img'
        const urlSupabase = await this.supabaseService.uploadImage(
          archivoImagen,
          'rowmark-product-img',
        );

        console.log('¡Imagen subida! URL:', urlSupabase);
        formData.imgUrl = urlSupabase; // Cambiamos el File por el String de la URL
      } catch (error) {
        console.error('Error de Supabase:', error);
        alert('Fallo al subir la imagen. Revisa la consola.');
        return;
      }
    }

    if (formData.finishKey) {
      // Modificar
      this.finishService.update(formData.finishKey, formData).subscribe({
        next: () => {
          alert('Acabado actualizado correctamente.');
          this.loadFinishes();
          this.selectedFinish = formData;
          this.closeModal();
        },
        error: (err) => console.error('Error al actualizar:', err),
      });
    } else {
      // Crear
      this.finishService.create(formData).subscribe({
        next: () => {
          alert('Acabado creado exitosamente.');
          this.loadFinishes();
          this.closeModal();
        },
        error: (err) => console.error('Error al crear:', err),
      });
    }
  }
}
