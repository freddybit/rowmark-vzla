import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Color } from '../../../models/entities/color';
import { ColorService } from '../../../services/rowmark-api/color-service/color.service';
import { DynamicModalComponent,DynamicField } from '../dynamic-modal.component/dynamic-modal.component';
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
  standalone: true, // Asegúrate de tener standalone en true
  // 👇 Añadimos DynamicModalComponent a los imports
  imports: [CommonModule, FlexRenderDirective, DynamicModalComponent],
  templateUrl: './color-management.component.html',
  styleUrl: './color-management.component.css',
})
export class ColorManagementComponent implements OnInit {
  private colorService = inject(ColorService);
  private supabaseService = inject(SupabaseService); // Inyectamos Supabase

  public colors: Color[] = [];
  public selectedColor: Color | null = null;
  public globalFilter: string = '';

  // --- VARIABLES DEL MODAL DINÁMICO ---
  public isModalOpen = false;
  public modalTitle = 'Agregar Color';
  public colorToEdit: any = {};

  // 👇 La receta exacta para crear/editar un Color
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

  // Configuración de TanStack Table
  table = createAngularTable(() => ({
    data: this.colors,
    columns: [
      { accessorKey: 'colorKey', header: 'ID' },
      { accessorKey: 'name', header: 'Nombre' },
      { accessorKey: 'hexadecimalCode', header: 'Color Superficie' },
      { accessorKey: 'hexadecimalCore', header: 'Color Núcleo' },
    ],
    state: {
      globalFilter: this.globalFilter,
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
    this.loadColors();
  }

  public loadColors(): void {
    this.colorService.getAll().subscribe({
      next: (data) => {
        this.colors = data;
        this.updateTableData();
      },
      error: (err) => console.error('Error:', err),
    });
  }

  onSearch(event: Event) {
    this.globalFilter = (event.target as HTMLInputElement).value;
    this.table.setOptions((prev) => ({
      ...prev,
      state: { ...prev.state, globalFilter: this.globalFilter },
    }));
  }

  private updateTableData() {
    this.table.setOptions((prev) => ({ ...prev, data: [...this.colors] }));
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
          this.colors = this.colors.filter((c) => c.colorKey !== id);
          this.updateTableData();
          if (this.selectedColor?.colorKey === id) {
            this.deselectColor();
          }
        },
        error: (err) => console.error('Error al eliminar:', err),
      });
    }
  }

  // --- MÉTODOS PARA CONTROLAR EL MODAL Y SUPABASE ---

  openCreateModal() {
    this.modalTitle = 'Agregar Nuevo Color';
    this.colorToEdit = {}; // Limpiamos para crear desde cero
    this.isModalOpen = true;
  }

  openEditModal() {
    this.modalTitle = 'Modificar Color';
    this.colorToEdit = { ...this.selectedColor }; // Pasamos los datos actuales
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // 👇 Método asíncrono para guardar imagen en la nube y datos en BD
  async saveColor(formData: any) {
    // 1. Verificamos si la imagen es un archivo nuevo que hay que subir
    if (formData.imgUrl instanceof File) {
      const archivoImagen: File = formData.imgUrl;
      try {
        console.log('Subiendo archivo a Supabase...', archivoImagen.name);

        // Asumiendo que usas el mismo bucket 'rowmark-product-img'
        const urlSupabase = await this.supabaseService.uploadImage(
          archivoImagen,
          'rowmark-product-img',
        );

        console.log('¡Imagen subida! URL:', urlSupabase);
        formData.imgUrl = urlSupabase; // Sobreescribimos File con String (URL)
      } catch (error) {
        console.error('Error de Supabase:', error);
        alert('Fallo al subir la imagen. Revisa la consola.');
        return; // Detenemos el guardado si falla la imagen
      }
    }

    // 2. Guardamos en C# / PostgreSQL
    if (formData.colorKey) {
      // Actualizar
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
      // Crear
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
