import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartManager } from '../../managers/cart-manager/cart.manager';
import { ProductDialogComponent } from '../product-dialog.component/product-dialog.component';
import { Product } from '../../models/entities/product';
import { ProductCard } from '../../models/entities/productCard';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [ProductDialogComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit, OnChanges {
  // Estado
  public selectionCoords: [number, number] = [0, 0];
  public product!: Product;
  public price: number = 0;
  public iva: number = 0;
  public totalPrice: number = 0;

  // Inyecciones
  public cartItems = inject(CartManager);

  // Entradas
  @Input({ required: true }) productCard!: ProductCard;
  @Input({ required: true }) euro!: number;

  ngOnInit(): void {
    // Inicializamos con la primera opción marcada
    this.updateCoordinate('x', 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Si cambia el euro o el productCard completo, recalculamos todo en el orden correcto
    if (changes['euro'] || changes['productCard']) {
      this.calculatePrice();
      this.buildProduct();
    }
  }

  updateCoordinate(axis: 'x' | 'y', index: number): void {
    if (axis === 'x') {
      this.selectionCoords[0] = index;
    } else {
      this.selectionCoords[1] = index;
    }

    this.calculatePrice();
    this.buildProduct();
  }

  private calculatePrice(): void {
    if (!this.productCard || !this.productCard.prices) return;

    const [x, y] = this.selectionCoords;

    this.price = this.productCard.prices[x][y] * this.euro;
    this.price = Math.round(this.price * 100) / 100;
    this.iva = Math.round(this.price * 0.16 * 100) / 100;
    this.totalPrice = Math.round((this.price + this.iva) * 100) / 100;
  }

  private buildProduct(): void {
    try {
      this.product = {
        id: 0,
        imgUrl: this.productCard.imgName,
        imgAlt: this.productCard.imgAlt,
        name: this.productCard.name,
        description: this.productCard.description,
        material: this.productCard.material,
        engravingDepth: this.productCard.engravingDepths[this.selectionCoords[1]],
        finish: this.productCard.finish,
        attributes: '',
        usage: this.productCard.usability,
        capabilities: this.productCard.capabilities,
        unitsAvailable: this.productCard.unitsAvailable,
        price: this.price,
        size: this.productCard.sizes[this.selectionCoords[0]],
        urlVideos: [],
        iva: this.iva,
        totalPrice: this.totalPrice,
      };
    } catch (e) {
      console.error('Error al construir el producto:', e);
    }
  }
}
