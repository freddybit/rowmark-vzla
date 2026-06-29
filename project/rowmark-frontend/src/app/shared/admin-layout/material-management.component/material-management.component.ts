import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MaterialService,
  Material,
} from '../../../services/rowmark-api/material-service/material.service';
// IMPORTANTE: Agregamos getFilteredRowModel a los imports
import {
  FlexRenderDirective,
  createAngularTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/angular-table';

@Component({
  selector: 'app-material-management',
  imports: [CommonModule, FlexRenderDirective],
  templateUrl: './material-management.component.html',
  styleUrl: './material-management.component.css',
})
export class MaterialManagementComponent implements OnInit {
  private materialService = inject(MaterialService);
  public materials: Material[] = [];
  public selectedMaterial: Material | null = null;

  // 1. Nueva variable para guardar el texto del buscador
  public globalFilter: string = '';

  table = createAngularTable(() => ({
    data: this.materials,
    columns: [
      { accessorKey: 'materialKey', header: 'ID' },
      { accessorKey: 'name', header: 'Nombre' },
      { accessorKey: 'category', header: 'Categoría' },
    ],
    // 1. Mantienes tu estado de búsqueda global
    state: {
      globalFilter: this.globalFilter,
    },

    // 2. NUEVO: Agregas el estado inicial para forzar la paginación a 7
    initialState: {
      pagination: {
        pageSize: 7, // <--- AQUÍ LIMITAS A 7 REGISTROS (puedes poner 5, 15, etc.)
        pageIndex: 0, // Arranca en la página 1 (índice 0)
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
      next: (data) => {
        this.materials = data;
        this.updateTableData();
      },
      error: (err) => console.error('Error:', err),
    });
  }

  // 4. Función que captura lo que escribes en el HTML y actualiza la tabla
  onSearch(event: Event) {
    this.globalFilter = (event.target as HTMLInputElement).value;

    this.table.setOptions((prev) => ({
      ...prev,
      state: {
        ...prev.state,
        globalFilter: this.globalFilter,
      },
    }));
  }

  // Función auxiliar para mantener limpio el código
  private updateTableData() {
    this.table.setOptions((prev) => ({ ...prev, data: [...this.materials] }));
  }

  selectMaterial(material: Material): void {
    this.selectedMaterial = material;
  }

  deselectMaterial(): void {
    this.selectedMaterial = null;
  }

  deleteMaterial(materialKey: number | undefined): void {
    if (!materialKey) return;

    this.materialService.delete(materialKey).subscribe({
      next: () => {
        this.materials = this.materials.filter((m) => m.materialKey !== materialKey);
        this.updateTableData();

        if (this.selectedMaterial?.materialKey === materialKey) {
          this.deselectMaterial();
        }
      },
      error: (err) => console.error('Error al eliminar:', err),
    });
  }
}
