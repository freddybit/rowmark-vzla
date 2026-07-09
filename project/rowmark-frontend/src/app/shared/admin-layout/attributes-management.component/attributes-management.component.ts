import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AttributeService,
  Attribute,
} from '../../../services/rowmark-api/attribute-service/attribute.service';
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
  selector: 'app-attributes-management',
  standalone: true,
  imports: [CommonModule, FlexRenderDirective, DynamicModalComponent],
  templateUrl: './attributes-management.component.html',
  styleUrl: './attributes-management.component.css',
})
export class AttributesManagementComponent implements OnInit {
  private attributeService = inject(AttributeService);
  private supabaseService = inject(SupabaseService);

  // 👇 1. Variables reactivas con Signals
  public attributes = signal<Attribute[]>([]);
  public globalFilter = signal<string>('');

  public selectedAttribute: Attribute | null = null;

  // --- VARIABLES DEL MODAL DINÁMICO ---
  public isModalOpen = false;
  public modalTitle = 'Agregar Atributo';
  public attributeToEdit: any = {};

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

  // 👇 2. La tabla lee los Signals invocándolos con paréntesis ()
  table = createAngularTable(() => ({
    data: this.attributes(),
    columns: [
      { accessorKey: 'attributeKey', header: 'ID' },
      { accessorKey: 'name', header: 'Nombre' },
    ],
    state: {
      globalFilter: this.globalFilter(),
    },
    initialState: {
      pagination: {
        pageSize: 6,
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
        // 👇 3. Seteamos la data; la tabla reacciona automáticamente
        this.attributes.set(data);
      },
      error: (err) => console.error('Error al cargar atributos:', err),
    });
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    // 👇 4. Actualizamos el filtro de forma reactiva
    this.globalFilter.set(value);
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
          // 👇 5. Actualizamos el Signal filtrando el eliminado
          this.attributes.update((prev) => prev.filter((a) => a.attributeKey !== attributeKey));

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
    this.attributeToEdit = {};
    this.isModalOpen = true;
  }

  openEditModal() {
    this.modalTitle = 'Modificar Atributo';
    this.attributeToEdit = { ...this.selectedAttribute };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async saveAttribute(formData: any) {
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

    if (formData.attributeKey) {
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
