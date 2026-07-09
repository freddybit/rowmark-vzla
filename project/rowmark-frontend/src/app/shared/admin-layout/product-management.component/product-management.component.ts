import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/rowmark-api/product-service/product.service';
import {
  FlexRenderDirective,
  createAngularTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
} from '@tanstack/angular-table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, FlexRenderDirective],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css',
})
export class ProductManagementComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);

  public products = signal<any[]>([]);
  public selectedProduct: any | null = null;
  public globalFilter = signal<string>('');
  public sorting = signal<SortingState>([]);
  public productToEdit: any = null;

  table = createAngularTable(() => ({
    data: this.products(),
    columns: [
      { accessorKey: 'productKey', header: 'ID' },
      { accessorKey: 'name', header: 'Nombre del Producto' },
    ],
    state: {
      globalFilter: this.globalFilter(),
      sorting: this.sorting(),
    },
    onSortingChange: (updater) => {
      if (typeof updater === 'function') this.sorting.update(updater);
      else this.sorting.set(updater);
    },
    initialState: {
      pagination: {
        pageSize: 7,
        pageIndex: 0,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  }));

  ngOnInit(): void {
    this.loadProducts();
  }

  public loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data: any[]) => this.products.set(data),
      error: (err: any) => console.error('Error cargando productos:', err),
    });
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.globalFilter.set(value);
  }

  selectProduct(product: any): void {
    this.selectedProduct = product;
  }

  deselectProduct(): void {
    this.selectedProduct = null;
  }

  deleteProduct(productKey: number | undefined): void {
    if (!productKey) return;

    if (confirm('¿Estás seguro de eliminar este Producto? Se borrarán sus precios asociados.')) {
      this.productService.deleteProduct(productKey).subscribe({
        next: () => {
          this.products.update((prev) => prev.filter((p) => p.productKey !== productKey));

          if (this.selectedProduct?.productKey === productKey) {
            this.deselectProduct();
          }

          console.log(`Producto ${productKey} eliminado con éxito.`);
        },
        error: (err: any) => {
          console.error('Error al eliminar:', err);

          if (err.status === 404) {
            alert('Este producto ya no existe en la base de datos.');
            this.loadProducts(); 
          } else {
            alert('Hubo un error al intentar eliminar el producto. Revisa la consola.');
          }
        },
      });
    }
  }

  navigateToCreate() {
    this.router.navigate(['/admin/product']);
  }

  navigateToEdit() {
    if (this.selectedProduct) {
      this.router.navigate(['/admin/product', this.selectedProduct.productKey]);
    }
  }
}
