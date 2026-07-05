import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SheetSizeService,
  SheetSize,
} from '../../../services/rowmark-api/sheet-size-service/sheet-size.service';
// 👇 Importamos solo el Modal Dinámico (Supabase no es necesario aquí)
import { DynamicModalComponent, DynamicField } from '../dynamic-modal.component/dynamic-modal.component';
import {
  FlexRenderDirective,
  createAngularTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/angular-table';

@Component({
  selector: 'app-sheet-size-management',
  standalone: true,
  // 👇 Agregamos el modal a los imports
  imports: [CommonModule, FlexRenderDirective, DynamicModalComponent],
  templateUrl: './sheet-size-management.component.html',
  styleUrls: ['./sheet-size-management.component.css'],
})
export class SheetSizeManagementComponent implements OnInit {
  private sheetSizeService = inject(SheetSizeService);
  public sheetSizes: SheetSize[] = [];
  public selectedSheetSize: SheetSize | null = null;
  public globalFilter: string = '';

  // --- VARIABLES DEL MODAL DINÁMICO ---
  public isModalOpen = false;
  public modalTitle = 'Agregar Tamaño de Lámina';
  public sheetSizeToEdit: any = {};

  // 👇 Configuración específica para SheetSize (Puros números y un texto corto)
  public modalConfigSheetSize: DynamicField[] = [
    { key: 'length', label: 'Largo', type: 'number', required: true, placeholder: 'Ej: 1238' },
    { key: 'width', label: 'Ancho', type: 'number', required: true, placeholder: 'Ej: 613' },
    {
      key: 'height',
      label: 'Alto / Grosor',
      type: 'number',
      required: true,
      placeholder: 'Ej: 1.5',
    },
    {
      key: 'unitMedition',
      label: 'Unidad de Medida',
      type: 'text',
      required: true,
      placeholder: 'Ej: mm, pulgadas',
    },
  ];

  table = createAngularTable(() => ({
    data: this.sheetSizes,
    columns: [
      { accessorKey: 'sheetSizeKey', header: 'ID' },
      { accessorKey: 'length', header: 'Largo' },
      { accessorKey: 'width', header: 'Ancho' },
      { accessorKey: 'height', header: 'Alto' },
      { accessorKey: 'unitMedition', header: 'Unidad' },
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
    this.loadSheetSizes();
  }

  public loadSheetSizes(): void {
    this.sheetSizeService.getAll().subscribe({
      next: (data) => {
        this.sheetSizes = data;
        this.updateTableData();
      },
      error: (err) => console.error('Error al cargar las dimensiones:', err),
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
    this.table.setOptions((prev) => ({ ...prev, data: [...this.sheetSizes] }));
  }

  selectSheetSize(sheetSize: SheetSize): void {
    this.selectedSheetSize = sheetSize;
  }

  deselectSheetSize(): void {
    this.selectedSheetSize = null;
  }

  deleteSheetSize(sheetSizeKey: number | undefined): void {
    if (!sheetSizeKey) return;

    if (confirm('¿Estás seguro de que deseas eliminar este tamaño de lámina?')) {
      this.sheetSizeService.delete(sheetSizeKey).subscribe({
        next: () => {
          this.sheetSizes = this.sheetSizes.filter((s) => s.sheetSizeKey !== sheetSizeKey);
          this.updateTableData();

          if (this.selectedSheetSize?.sheetSizeKey === sheetSizeKey) {
            this.deselectSheetSize();
          }
        },
        error: (err) => console.error('Error al eliminar:', err),
      });
    }
  }

  // --- MÉTODOS PARA CONTROLAR EL MODAL ---

  openCreateModal() {
    this.modalTitle = 'Agregar Nuevo Tamaño';
    this.sheetSizeToEdit = {}; // Formulario vacío
    this.isModalOpen = true;
  }

  openEditModal() {
    this.modalTitle = 'Modificar Tamaño de Lámina';
    this.sheetSizeToEdit = { ...this.selectedSheetSize }; // Copiamos los datos actuales
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // 👇 Método sincrónico para guardar directo a la API de .NET (No hay imágenes)
  saveSheetSize(formData: any) {
    // Convertimos los valores a número por seguridad antes de enviarlos a C#
    const payload: SheetSize = {
      ...formData,
      length: Number(formData.length),
      width: Number(formData.width),
      height: Number(formData.height),
    };

    if (payload.sheetSizeKey) {
      // Modificar
      this.sheetSizeService.update(payload.sheetSizeKey, payload).subscribe({
        next: () => {
          alert('Tamaño de lámina actualizado correctamente.');
          this.loadSheetSizes();
          this.selectedSheetSize = payload;
          this.closeModal();
        },
        error: (err) => console.error('Error al actualizar:', err),
      });
    } else {
      // Crear
      this.sheetSizeService.create(payload).subscribe({
        next: () => {
          alert('Tamaño de lámina creado exitosamente.');
          this.loadSheetSizes();
          this.closeModal();
        },
        error: (err) => console.error('Error al crear:', err),
      });
    }
  }
}
