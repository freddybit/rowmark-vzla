import { Component, inject, OnInit, signal, ChangeDetectorRef } from '@angular/core';
import { ProductCardComponent } from "../product-card.component/product-card.component";
import { DolarApi } from '../../services/dolar-api/dolar-api';
import { ProductCard } from '../../models/entities/productCard';

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

  activeSheet: '120x60cm' | '60x30cm' | '30x30cm' = '120x60cm';

  selectSizeSheet(size: '120x60cm' | '60x30cm' | '30x30cm'): void {
    this.activeSheet = size;
  }

  public products: ProductCard[] = [
    {
      imgName: 'flexibrass.jpg',
      imgAlt: 'FlexiBrass',
      name: 'FlexiBrass',
      description:
        'Flexible, ligera y resistente. Esta línea de productos combina la definición nítida y clásica del grabado del latón auténtico con todas las ventajas del acrílico fino y flexible. Disponible con o sin adhesivo. Los plásticos blancos y de colores claros no suelen ser adecuados para la fabricación con láser de diodo.',
      unitsAvailable: 10,
      material: 'ABS con micro-superficie',
      finish: 'Metal cepillado',
      usability: 'Señalización, identificación personal.',
      capabilities:
        'Allows the use of saws and drills, Allows the use of shears, Can be beveled, Is heat-foldable, Suitable for screen printing, hot stamping, and bonding (gluing), Allows for fine engraving.',
      sizes: ['120x60cm', '60x30cm', '30x30cm'],
      engravingDepths: [1.6, 0.8], 
      prices: [
        [59, 55],
        [39, 35],
        [19, 15],
      ],
    },
    {
      imgName: 'standard_metal.jpg',
      imgAlt: 'Standard Metals',
      name: 'Standard Metals',
      description:
        'Standard Metals tiene el brillo del metal real. Cada color se crea mediante un proceso de huecograbado texturizado para reflejar su propia calidad única. Para obtener protección adicional, se puede solicitar el recubrimiento NoMark Plus, que es una capa dura especial que otorga a los metales una durabilidad superior para evitar rayones y marcas, además de ofrecer el beneficio de una apariencia brillante para lograr un acabado de metal real y lustroso.',
      unitsAvailable: 10,
      material: 'ABS con micro-superficie',
      finish: 'Metal cepillado',
      usability: 'Señalización, identificación personal.',
      capabilities:
        'Allows the use of saws and drills, Allows the use of shears, Can be beveled, Is heat-foldable, Suitable for screen printing, hot stamping, and bonding (gluing), Allows for fine engraving.',
      sizes: ['120x60cm', '60x30cm', '30x30cm'],
      engravingDepths: [1.6, 0.8],
      prices: [
        [79, 75],
        [59, 55],
        [29, 25],
      ],
    },
  ];

  ngOnInit(): void {
    this.dolarApi.getEuroBcv().subscribe({
      next: (data) => {
        this.euroBcv = Math.round(data.promedio * 10000) / 10000;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorLoad.set('No se pudo obtener la tasa del BCV');
        console.error(err);
      },
    });
  }
}
