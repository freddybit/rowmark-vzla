import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interfaz que simula el DTO (Data Transfer Object) de lectura desde tu API en C#
export interface SheetSummary {
  id: string; // Asumiendo un GUID o ID de base de datos
  name: string;
  material: string;
  finish: string;
  unitsAvailable: number;
  imgUrl: string;
  sizes: string[];
}

@Component({
  selector: 'app-look-stock',
  standalone: true,
  imports: [CommonModule], // Necesario para el pipe de moneda o fechas si los usas
  templateUrl: './look-stock.page.html',
  styleUrl: './look-stock.page.css',
})
export class LookStockPage implements OnInit {
  // Lista original que vendría de tu backend
  stockList: SheetSummary[] = [];

  // Lista que se mostrará en el HTML (la usamos para no perder la original al filtrar)
  filteredStock: SheetSummary[] = [];

  ngOnInit(): void {
    this.loadMockData();
  }

  // Lógica simple de filtrado en memoria
  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();

    if (!searchTerm) {
      this.filteredStock = [...this.stockList];
      return;
    }

    this.filteredStock = this.stockList.filter(
      (sheet) =>
        sheet.name.toLowerCase().includes(searchTerm) ||
        sheet.material.toLowerCase().includes(searchTerm),
    );
  }

  // Simulamos la llamada HTTP a tu backend
  private loadMockData(): void {
    this.stockList = [
      {
        id: '1',
        name: 'Lámina Acrílica Transparente',
        material: 'Acrílico',
        finish: 'Brillante',
        unitsAvailable: 45,
        imgUrl: 'https://via.placeholder.com/300x200?text=Acrilico+Transparente',
        sizes: ['120x60', '60x60'],
      },
      {
        id: '2',
        name: 'Lámina Bicapa Oro/Negro',
        material: 'ABS',
        finish: 'Cepillado',
        unitsAvailable: 4, // Stock bajo para probar el color rojo
        imgUrl: 'https://via.placeholder.com/300x200?text=Bicapa+Oro',
        sizes: ['60x60', '30x60'],
      },
      {
        id: '3',
        name: 'Lámina MDF Sublimable',
        material: 'Madera MDF',
        finish: 'Mate',
        unitsAvailable: 120,
        imgUrl: 'https://via.placeholder.com/300x200?text=MDF+Madera',
        sizes: ['120x60'],
      },
    ];

    this.filteredStock = [...this.stockList];
  }
}
