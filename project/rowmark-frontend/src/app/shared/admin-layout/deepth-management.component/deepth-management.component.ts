import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeepthService, Deepth } from '../../../services/rowmark-api/deepth-service/deepth.service';
// 👇 Importamos solo el Modal Dinámico
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
  selector: 'app-deepth-management',
  standalone: true,
  // 👇 Agregamos el modal a los imports
  imports: [CommonModule, FlexRenderDirective, DynamicModalComponent],
  templateUrl: './deepth-management.component.html',
  styleUrls: ['./deepth-management.component.css'],
})
export class DeepthManagementComponent implements OnInit {
  private deepthService = inject(DeepthService);
  public deepths: Deepth[] = [];
  public selectedDeepth: Deepth | null = null;
  public globalFilter: string = '';

  // --- VARIABLES DEL MODAL DINÁMICO ---
  public isModalOpen = false;
  public modalTitle = 'Agregar Profundidad';
  public deepthToEdit: any = {};

  // 👇 Configuración específica para Deepth
  public modalConfigDeepth: DynamicField[] = [
    {
      key: 'depth',
      label: 'Profundidad de Grabado',
      type: 'number',
      required: true,
      placeholder: 'Ej: 0.08',
    },
    {
      key: 'unitMedition',
      label: 'Unidad de Medida',
      type: 'text',
      required: true,
      placeholder: 'Ej: mm, pulgadas, mil',
    },
  ];

  table = createAngularTable(() => ({
    data: this.deepths,
    columns: [
      {
        accessorKey: 'engravingDepthKey',
        header: 'ID',
      },
      {
        accessorKey: 'depth',
        header: 'Profundidad',
      },
      {
        accessorKey: 'unitMedition',
        header: 'Unidad',
      },
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
    this.loadDeepths();
  }

  public loadDeepths(): void {
    this.deepthService.getAll().subscribe({
      next: (data) => {
        this.deepths = data;
        this.updateTableData();
      },
      error: (err) => console.error('Error al cargar las profundidades:', err),
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
    this.table.setOptions((prev) => ({ ...prev, data: [...this.deepths] }));
  }

  selectDeepth(deepth: Deepth): void {
    this.selectedDeepth = deepth;
  }

  deselectDeepth(): void {
    this.selectedDeepth = null;
  }

  deleteDeepth(engravingDepthKey: number | undefined): void {
    if (!engravingDepthKey) return;

    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      this.deepthService.delete(engravingDepthKey).subscribe({
        next: () => {
          this.deepths = this.deepths.filter((d) => d.engravingDepthKey !== engravingDepthKey);
          this.updateTableData();

          if (this.selectedDeepth?.engravingDepthKey === engravingDepthKey) {
            this.deselectDeepth();
          }
        },
        error: (err) => console.error('Error al eliminar:', err),
      });
    }
  }

  // --- MÉTODOS PARA CONTROLAR EL MODAL ---

  openCreateModal() {
    this.modalTitle = 'Agregar Nueva Profundidad';
    this.deepthToEdit = {};
    this.isModalOpen = true;
  }

  openEditModal() {
    this.modalTitle = 'Modificar Profundidad';
    this.deepthToEdit = { ...this.selectedDeepth };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveDeepth(formData: any) {
    const payload: Deepth = {
      ...formData,
      depth: Number(formData.depth),
    };

    if (payload.engravingDepthKey) {

      this.deepthService.update(payload.engravingDepthKey, payload).subscribe({
        next: () => {
          alert('Profundidad actualizada correctamente.');
          this.loadDeepths();
          this.selectedDeepth = payload;
          this.closeModal();
        },
        error: (err) => console.error('Error al actualizar:', err),
      });
    } else {
      // Crear
      this.deepthService.create(payload).subscribe({
        next: () => {
          alert('Profundidad creada exitosamente.');
          this.loadDeepths();
          this.closeModal();
        },
        error: (err) => console.error('Error al crear:', err),
      });
    }
  }
}
