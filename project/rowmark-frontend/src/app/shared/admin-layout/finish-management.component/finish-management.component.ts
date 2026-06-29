import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Finish } from '../../../models/entities/finish';
import { FinishService } from '../../../services/rowmark-api/finish-service/finish.service';
import {
  FlexRenderDirective,
  createAngularTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/angular-table';

@Component({
  selector: 'app-finish-management',
  imports: [CommonModule, FlexRenderDirective],
  templateUrl: './finish-management.component.html',
  styleUrl: './finish-management.component.css',
})
export class FinishManagementComponent implements OnInit {
  private finishService = inject(FinishService);
  public finishes: Finish[] = [];
  public selectedFinish: Finish | null = null;
  public globalFilter: string = '';

  // Configuración de TanStack Table
  table = createAngularTable(() => ({
    data: this.finishes,
    columns: [
      { accessorKey: 'finishKey', header: 'ID' },
      { accessorKey: 'name', header: 'Nombre' },
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
    this.loadFinishes();
  }

  public loadFinishes(): void {
    this.finishService.getAll().subscribe({
      next: (data) => {
        this.finishes = data;
        this.updateTableData();
      },
      error: (err) => console.error('Error al cargar acabados:', err),
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
    this.table.setOptions((prev) => ({ ...prev, data: [...this.finishes] }));
  }

  selectFinish(finish: Finish): void {
    this.selectedFinish = finish;
  }

  deselectFinish(): void {
    this.selectedFinish = null;
  }

  deleteFinish(finishKey: number | undefined): void {
    if (!finishKey) return;

    if (confirm('¿Estás seguro de que deseas eliminar este acabado?')) {
      this.finishService.delete(finishKey).subscribe({
        next: () => {
          this.finishes = this.finishes.filter((f) => f.finishKey !== finishKey);
          this.updateTableData();

          if (this.selectedFinish?.finishKey === finishKey) {
            this.deselectFinish();
          }
        },
        error: (err) => console.error('Error al eliminar:', err),
      });
    }
  }
}
