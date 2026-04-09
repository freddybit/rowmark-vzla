import { Component, inject, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { ProductCardComponent } from "../product-card.component/product-card.component";
import { DolarApi } from '../../services/dolar-api/dolar-api';

@Component({
  selector: 'app-catalog',
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent implements OnInit {

  private dolarApi = inject(DolarApi);
  private cdr = inject(ChangeDetectorRef);

  errorLoad = signal<string | null>(null);
  euroBcv: number = 0;

  activeSheet: 'full' | 'medium' | 'quarter' = 'full';

  selectSizeSheet(size: 'full' | 'medium' | 'quarter'): void {
    this.activeSheet = size;
  }

  ngOnInit(): void {
    this.dolarApi.getEuroBcv().subscribe({
      next: (data) => {
        this.euroBcv = (Math.round(data.promedio * 10000) / 10000);
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorLoad.set('No se pudo obtener la tasa del BCV');
        console.error(err);
      }
    });
  }
}
