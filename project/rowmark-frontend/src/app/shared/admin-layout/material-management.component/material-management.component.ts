import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialService } from '../../../services/rowmark-api/material-service/material.service';
import { Material } from '../../../models/entities/material';
import { DynamicModalComponent, DynamicField } from '../dynamic-modal.component/dynamic-modal.component';
import {
  FlexRenderDirective,
  createAngularTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
} from '@tanstack/angular-table';
import { SupabaseService } from '../../../services/supabase-service/supabase.service';

@Component({
  selector: 'app-material-management',
  standalone: true,
  // 👇 Añadimos DynamicModalComponent a los imports
  imports: [CommonModule, FlexRenderDirective, DynamicModalComponent],
  templateUrl: './material-management.component.html',
  styleUrl: './material-management.component.css',
})
export class MaterialManagementComponent implements OnInit {
  private materialService = inject(MaterialService);
  private supabaseService = inject(SupabaseService);
  public materials = signal<Material[]>([]);
  public selectedMaterial: Material | null = null;
  public globalFilter = signal<string>('');
  public sorting = signal<SortingState>([]);
  public isModalOpen = false;
  public modalTitle = 'Agregar Material';
  public materialToEdit: any = {};

  public modalConfigMaterial: DynamicField[] = [
    { key: 'name', label: 'Nombre del Material', type: 'text', required: true },
    { key: 'category', label: 'Categoría', type: 'text', required: true },
    {
      key: 'imgUrl',
      label: 'Imagen del Material',
      type: 'file',
      accept: 'image/png, image/jpeg, image/webp',
    },
    { key: 'description', label: 'Descripción', type: 'textarea' },
  ];

  table = createAngularTable(() => ({
    data: this.materials(),
    columns: [
      { accessorKey: 'materialKey', header: 'ID' },
      { accessorKey: 'name', header: 'Nombre' },
      { accessorKey: 'category', header: 'Categoría' },
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
    this.loadMaterials();
  }

  public loadMaterials(): void {
    this.materialService.getAll().subscribe({
      next: (data) => this.materials.set(data),
      error: (err) => console.error('Error:', err),
    });
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.globalFilter.set(value);
  }

  selectMaterial(material: Material): void {
    this.selectedMaterial = material;
  }

  deselectMaterial(): void {
    this.selectedMaterial = null;
  }

  deleteMaterial(materialKey: number | undefined): void {
    if (!materialKey) return;
    if (confirm('¿Estás seguro de eliminar este material?')) {
      this.materialService.delete(materialKey).subscribe({
        next: () => {
          this.materials.update((prev) => prev.filter((m) => m.materialKey !== materialKey));
          if (this.selectedMaterial?.materialKey === materialKey) {
            this.deselectMaterial();
          }
        },
        error: (err) => console.error('Error al eliminar:', err),
      });
    }
  }

  // --- MÉTODOS PARA CONTROLAR EL MODAL ---

  openCreateModal() {
    this.modalTitle = 'Agregar Nuevo Material';
    this.materialToEdit = {};
    this.isModalOpen = true;
  }

  openEditModal() {
    this.modalTitle = 'Modificar Material';
    this.materialToEdit = { ...this.selectedMaterial };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async saveMaterial(formData: any) {

    if (formData.imgUrl instanceof File) {
      const archivoImagen: File = formData.imgUrl;

      try {
        console.log('Subiendo archivo a Supabase...', archivoImagen.name);
        const urlSupabase = await this.supabaseService.uploadImage(archivoImagen, 'rowmark-product-img');
        console.log('¡Imagen subida con éxito! URL:', urlSupabase);

        formData.imgUrl = urlSupabase;

      } catch (error) {
        console.error('Error detallado de Supabase:', error);
        alert('Fallo al subir la imagen a Supabase. Revisa la consola.');
        return;
      }
    }

    if (formData.materialKey) {
      this.materialService.update(formData.materialKey, formData).subscribe({
        next: () => {
          alert('Material actualizado correctamente.');
          this.loadMaterials();
          this.selectedMaterial = formData;
          this.closeModal();
        },
        error: (err) => console.error('Error al actualizar:', err),
      });
    } else {
      this.materialService.create(formData).subscribe({
        next: () => {
          alert('Material creado exitosamente.');
          this.loadMaterials();
          this.closeModal();
        },
        error: (err) => console.error('Error al crear:', err),
      });
    }
  }
}
