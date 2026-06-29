import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MaterialService,
  Material,
} from '../../../services/rowmark-api/material-service/material.service';
import {
  FlexRenderDirective,
  createAngularTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/angular-table';

@Component({
  selector: 'app-capability-management',
  standalone: true,
  imports: [CommonModule, FlexRenderDirective],
  templateUrl: './capability-management.component.html',
  styleUrls: ['./capability-management.component.css'],
})
export class CapabilityManagementComponent implements OnInit {
  private materialService = inject(MaterialService);
  public materials: Material[] = [];
  public selectedMaterial: Material | null = null;

  // 1. Configuramos el motor de TanStack
  table = createAngularTable(() => ({
    data: this.materials,
    // 2. Definimos las columnas y qué dato muestran
    columns: [
      {
        accessorKey: 'materialKey',
        header: 'ID',
      },
      {
        accessorKey: 'name',
        header: 'Nombre',
      },
      {
        accessorKey: 'category',
        header: 'Categoría',
      },
    ],
    // 3. Activamos módulos de ordenamiento y paginación
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  }));

  ngOnInit(): void {
    this.loadMaterials();
  }

  public loadMaterials(): void {
    this.materialService.getAll().subscribe({
      next: (data) => {
        this.materials = data;
        // Importante: TanStack no detecta mutaciones directamente,
        // debemos reasignar el arreglo para que actualice.
        this.table.setOptions((prev) => ({ ...prev, data: [...this.materials] }));
      },
      error: (err) => console.error('Error:', err),
    });
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
        this.table.setOptions((prev) => ({ ...prev, data: [...this.materials] }));

        if (this.selectedMaterial?.materialKey === materialKey) {
          this.deselectMaterial();
        }
      },
      error: (err) => console.error('Error al eliminar:', err),
    });
  }
}
