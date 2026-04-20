import { Component, effect, ElementRef, inject, Input, OnChanges, OnInit, signal, SimpleChanges, ViewChild } from '@angular/core';
import { CartManager } from '../../managers/cart-manager/cart.manager';
import { ProductDialogComponent } from '../product-dialog.component/product-dialog.component';
import { Product } from '../../models/entities/product';
import { ProductCard } from '../../models/entities/productCard';


@Component({
  selector: 'app-product-card',
  imports: [ProductDialogComponent],
  templateUrl: './product-card.component.html',  
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit, OnChanges {

  public selectionCoords: [number, number] = [0, 0];
  public cartItems = inject(CartManager);
  public product!: Product;
  @Input() productCard!: ProductCard;
  @Input() euro!: number;

  price: number = 0;
  iva: number = 0;
  totalPrice: number = 0;
  cardDescription: string = '';

  getCardDescription(): void {
    if (this.productCard.description.length > 90)
      this.cardDescription = this.productCard.description.slice(0, 80) + '...';
    else this.cardDescription = this.productCard.description;
  }

  updateIva(): number {
    return this.price * 0.16;
  }

  updateCoordinate(axis: 'x' | 'y', index: number): void {
    if (axis === 'x') {
      this.selectionCoords[0] = index;
    } else {
      this.selectionCoords[1] = index;
    }

    this.calculatePrice();
  }

  private calculatePrice(): void {
    const [x, y] = this.selectionCoords;

    this.price = this.productCard.prices[x][y] * this.euro;

    this.price = Math.round(this.price * 100) / 100;
    this.iva = this.updateIva();
    this.iva = Math.round(this.iva * 100) / 100;
    this.totalPrice = this.price + this.iva;
    this.totalPrice  = Math.round(this.totalPrice * 100) / 100;
  }

  defaultStateComponent(): void {
    try {
      this.price = this.productCard.prices[0][0] * this.euro;
      this.price = Math.round(this.price * 100) / 100;
      this.iva = this.price * 0.16;
      this.iva = Math.round(this.iva * 100) / 100;
      this.totalPrice = this.price + this.iva;
      this.totalPrice = Math.round(this.totalPrice * 100) / 100;

      this.product = {
        id: 0,
        imgUrl: this.productCard.imgName,
        imgAlt: this.productCard.imgAlt,
        name: this.productCard.name,
        description: this.productCard.description,
        material: this.productCard.material,
        engravingDepth: this.productCard.engravingDepths[0],
        finish: this.productCard.finish,
        attributes: '',
        usage: this.productCard.usability,
        capabilities: this.productCard.capabilities,
        unitsAvailable: this.productCard.unitsAvailable,
        price: this.price,
        size: this.productCard.sizes[0],
        urlVideos: [],
        iva: this.iva,
        totalPrice: this.totalPrice,
      };
    } catch (e) {
      console.log('Error:', e);
    }
  }

  ngOnInit(): void {
    this.defaultStateComponent();
    this.getCardDescription();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['euro'] || changes['prices']) {
      this.defaultStateComponent();
    }
  }
}
