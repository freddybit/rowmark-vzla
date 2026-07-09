import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Color } from '../../../models/entities/color';
import { ColorService } from '../../../services/rowmark-api/color-service/color.service';
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
  selector: 'app-color-management',
  standalone: true,
  imports: [CommonModule, FlexRenderDirective, DynamicModalComponent],
  templateUrl: './color-management.component.html',
  styleUrl: './color-management.component.css',
})
export class ColorManagementComponent implements OnInit {
  private colorService = inject(ColorService);
  private supabaseService = inject(SupabaseService);

  public colors = signal<Color[]>([]);
  public globalFilter = signal<string>('');

  public selectedColor: Color | null = null;

  public isModalOpen = false;
  public modalTitle = 'Agregar Color';
  public colorToEdit: any = {};

  public modalConfigColor: DynamicField[] = [
    {
      key: 'name',
      label: 'Nombre del Color',
      type: 'text',
      required: true,
      placeholder: 'Ej: Rojo Rubí',
    },
    { key: 'hexadecimalCode', label: 'Color de Superficie (HEX)', type: 'color', required: true },
    { key: 'hexadecimalCore', label: 'Color de Núcleo (HEX)', type: 'color', required: true },
    {
      key: 'imgAlt',
      label: 'Texto Alternativo (Alt)',
      type: 'text',
      placeholder: 'Ej: Textura roja',
    },
    {
      key: 'imgUrl',
      label: 'Imagen Representativa',
      type: 'file',
      accept: 'image/png, image/jpeg, image/webp',
    },
  ];

  table = createAngularTable(() => ({
    data: this.colors(),
    columns: [
      { accessorKey: 'colorKey', header: 'ID' },
      { accessorKey: 'name', header: 'Nombre' },
      { accessorKey: 'hexadecimalCode', header: 'Color Superficie' },
      { accessorKey: 'hexadecimalCore', header: 'Color Núcleo' },
    ],
    state: {
      globalFilter: this.globalFilter(),
    },
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  }));

  ngOnInit(): void {
    this.loadColors();
  }

  public loadColors(): void {
    this.colorService.getAll().subscribe({
      next: (data) => {
        this.colors.set(data);
      },
      error: (err) => console.error('Error:', err),
    });
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    // 👇 4. Actualizamos el Signal del filtro
    this.globalFilter.set(value);
  }

  selectColor(color: Color): void {
    this.selectedColor = color;
  }

  deselectColor(): void {
    this.selectedColor = null;
  }

  deleteColor(id: number | undefined): void {
    if (!id) return;
    if (confirm('¿Estás seguro de que deseas eliminar este color?')) {
      this.colorService.delete(id).subscribe({
        next: () => {
          // 👇 5. Usamos .update() para filtrar el arreglo de forma reactiva
          this.colors.update((prev) => prev.filter((c) => c.colorKey !== id));
          if (this.selectedColor?.colorKey === id) {
            this.deselectColor();
          }
        },
        error: (err) => console.error('Error al eliminar:', err),
      });
    }
  }

  openCreateModal() {
    this.modalTitle = 'Agregar Nuevo Color';
    this.colorToEdit = {};
    this.isModalOpen = true;
  }

  openEditModal() {
    this.modalTitle = 'Modificar Color';
    this.colorToEdit = { ...this.selectedColor };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async saveColor(formData: any) {
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

    if (formData.colorKey) {
      this.colorService.update(formData.colorKey, formData).subscribe({
        next: () => {
          alert('Color actualizado correctamente.');
          this.loadColors();
          this.selectedColor = formData;
          this.closeModal();
        },
        error: (err) => console.error('Error al actualizar:', err),
      });
    } else {
      this.colorService.create(formData).subscribe({
        next: () => {
          alert('Color creado exitosamente.');
          this.loadColors();
          this.closeModal();
        },
        error: (err) => console.error('Error al crear:', err),
      });
    }
  }
}
