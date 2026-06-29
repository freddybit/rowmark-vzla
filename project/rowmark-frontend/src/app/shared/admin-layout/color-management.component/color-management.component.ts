import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Color } from '../../../models/entities/color';
// Asegúrate de tener la ruta correcta a tu servicio
import { ColorService } from '../../../services/rowmark-api/color-service/color.service';
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
  imports: [CommonModule, FlexRenderDirective],
  templateUrl: './color-management.component.html',
  styleUrl: './color-management.component.css',
})
export class ColorManagementComponent implements OnInit {
  private colorService = inject(ColorService);
  public colors: Color[] = [];
  public selectedColor: Color | null = null;
  public globalFilter: string = '';

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
        pageSize: 10, // Limitado estrictamente a 10 registros
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
    // Asumiendo que tu ColorService tiene el método getAll()
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
}
