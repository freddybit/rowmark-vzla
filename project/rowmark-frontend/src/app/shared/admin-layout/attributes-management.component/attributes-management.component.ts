import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// Asegúrate de que las rutas a tu modelo y servicio sean las correctas
import {
  AttributeService,
  Attribute,
} from '../../../services/rowmark-api/attribute-service/attribute.service';
// 👇 Importamos el Modal y el Servicio de Supabase
import { DynamicModalComponent, DynamicField } from '../dynamic-modal.component/dynamic-modal.component';
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
  selector: 'app-attributes-management',
  standalone: true, // Siempre recomendado si usas imports directos
  // 👇 Añadimos DynamicModalComponent al arreglo
  imports: [CommonModule, FlexRenderDirective, DynamicModalComponent],
  templateUrl: './attributes-management.component.html',
  styleUrl: './attributes-management.component.css',
})
export class AttributesManagementComponent implements OnInit {
  private attributeService = inject(AttributeService);
  private supabaseService = inject(SupabaseService); // 👇 Inyectamos Supabase

  public attributes: Attribute[] = [];
  public selectedAttribute: Attribute | null = null;
  public globalFilter: string = '';

  // --- VARIABLES DEL MODAL DINÁMICO ---
  public isModalOpen = false;
  public modalTitle = 'Agregar Atributo';
  public attributeToEdit: any = {};

  // 👇 Configuración exacta para crear/editar un Atributo
  public modalConfigAttribute: DynamicField[] = [
    {
      key: 'name',
      label: 'Nombre del Atributo',
      type: 'text',
      required: true,
      placeholder: 'Ej: Resistente a los rayos UV',
    },
    {
      key: 'description',
      label: 'Descripción',
      type: 'textarea',
      placeholder: 'Detalles del atributo...',
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
    data: this.attributes,
    columns: [
      { accessorKey: 'attributeKey', header: 'ID' },
      { accessorKey: 'name', header: 'Nombre' },
    ],
    state: {
      globalFilter: this.globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 6, // Limitado estrictamente a 6 registros
        pageIndex: 0,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  }));

  ngOnInit(): void {
    this.loadAttributes();
  }

  public loadAttributes(): void {
    this.attributeService.getAll().subscribe({
      next: (data) => {
        this.attributes = data;
        this.updateTableData();
      },
      error: (err) => console.error('Error al cargar atributos:', err),
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
    this.table.setOptions((prev) => ({ ...prev, data: [...this.attributes] }));
  }

  selectAttribute(attribute: Attribute): void {
    this.selectedAttribute = attribute;
  }

  deselectAttribute(): void {
    this.selectedAttribute = null;
  }

  deleteAttribute(attributeKey: number | undefined): void {
    if (!attributeKey) return;

    if (confirm('¿Estás seguro de que deseas eliminar este atributo?')) {
      this.attributeService.delete(attributeKey).subscribe({
        next: () => {
          this.attributes = this.attributes.filter((a) => a.attributeKey !== attributeKey);
          this.updateTableData();

          if (this.selectedAttribute?.attributeKey === attributeKey) {
            this.deselectAttribute();
          }
        },
        error: (err) => console.error('Error al eliminar:', err),
      });
    }
  }

  // --- MÉTODOS PARA CONTROLAR EL MODAL Y SUPABASE ---

  openCreateModal() {
    this.modalTitle = 'Agregar Nuevo Atributo';
    this.attributeToEdit = {}; // Limpiamos para crear desde cero
    this.isModalOpen = true;
  }

  openEditModal() {
    this.modalTitle = 'Modificar Atributo';
    this.attributeToEdit = { ...this.selectedAttribute }; // Pasamos los datos actuales
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // 👇 Guardamos imagen en Supabase y luego en PostgreSQL
  async saveAttribute(formData: any) {
    if (formData.imgUrl instanceof File) {
      const archivoImagen: File = formData.imgUrl;
      try {
        console.log('Subiendo archivo a Supabase...', archivoImagen.name);

        // Seguimos usando tu bucket público 'rowmark-product-img'
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

    if (formData.attributeKey) {
      // Modificar
      this.attributeService.update(formData.attributeKey, formData).subscribe({
        next: () => {
          alert('Atributo actualizado correctamente.');
          this.loadAttributes();
          this.selectedAttribute = formData;
          this.closeModal();
        },
        error: (err) => console.error('Error al actualizar:', err),
      });
    } else {
      // Crear
      this.attributeService.create(formData).subscribe({
        next: () => {
          alert('Atributo creado exitosamente.');
          this.loadAttributes();
          this.closeModal();
        },
        error: (err) => console.error('Error al crear:', err),
      });
    }
  }
}
