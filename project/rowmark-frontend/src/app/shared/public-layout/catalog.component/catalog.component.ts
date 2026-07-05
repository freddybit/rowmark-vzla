import { Component, inject, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { ProductCardComponent } from '../product-card.component/product-card.component';
import { DolarApi } from '../../../services/dolar-api/dolar-api';
import { ProductCard } from '../../../models/entities/productCard';
// Asegúrate de importar el servicio que creamos
import { ProductService } from '../../../services/rowmark-api/product-service/product.service';

@Component({
  selector: 'app-catalog',
  standalone: true, // Asumo que es standalone por el array imports
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent implements OnInit {
  private dolarApi = inject(DolarApi);
  private productService = inject(ProductService); // <-- 1. Inyectamos tu nuevo servicio
  private cdr = inject(ChangeDetectorRef);

  errorLoad = signal<string | null>(null);
  euroBcv: number = 0;

  activeSheet: string = '120x60 mm'; // Lo dejo como string genérico para que empate con lo que viene de BD

  selectSizeSheet(size: string): void {
    this.activeSheet = size;
  }

  // 2. Inicializamos el arreglo vacío para que se llene dinámicamente
  public products: ProductCard[] = [];

  ngOnInit(): void {
    // 3. Cargar Tasa BCV
    this.dolarApi.getEuroBcv().subscribe({
      next: (data) => {
        this.euroBcv = Math.round(data.promedio * 10000) / 10000;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorLoad.set('No se pudo obtener la tasa del BCV');
        console.error('Error BCV:', err);
      },
    });

    // 4. Cargar Productos desde el Backend en C#
    this.productService.getProductCards().subscribe({
      next: (data) => {
        this.products = data;
        console.log('Catálogo cargado exitosamente', this.products);
        this.cdr.detectChanges(); // <-- Forzamos a Angular a re-dibujar la vista
      },
      error: (err) => {
        this.errorLoad.set('No se pudieron cargar los productos del catálogo.');
        console.error('Error cargando productos:', err);
      },
    });
  }
}
