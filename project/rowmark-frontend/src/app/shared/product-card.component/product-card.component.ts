import { Component, effect, ElementRef, inject, Input, OnChanges, OnInit, signal, SimpleChanges, ViewChild } from '@angular/core';
import { ShoppingCardSheetDto } from '../../models/dtos/shopping-card-sheet.dto';
import { CartManager } from '../../managers/cart-manager/cart.manager';
import { ProductDialogComponent } from '../product-dialog.component/product-dialog.component';

@Component({
  selector: 'app-product-card',
  imports: [ProductDialogComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit, OnChanges {
  private cartItems = inject(CartManager);

  // Card inputs
  @Input() imgName: string = '';
  @Input() imgAlt: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() unitsEnabled: string = '';
  @Input() usability: string = '';
  @Input() material: string = '';
  @Input() finish: string = '';
  @Input() attributes: string = '';
  @Input() usage: string = '';
  @Input() capabilities: string = '';
  @Input() prices: Array<Array<number>> = [[0], [0]];
  @Input() sizes: Array<string> = [''];
  @Input() engravingDepth: Array<number> = [0];

  // Model Window inputs
  @Input() euro: number = 0;
  @Input() colors: Array<string> = [];

  price: number = this.prices[0][0];
  iva: number = this.price * 0.16;
  totalPrice: number = this.price + this.iva;
  cardDescription: string = '';

  getCardDescription(): void {
    if (this.description.length > 90) this.cardDescription = this.description.slice(0, 80) + '...';
    else this.cardDescription = this.description;
  }

  oneEngravingDepth(): boolean {
    if (this.engravingDepth.length == 1) return true;
    return false;
  }

  updateIva(): number {
    return this.price * 0.16;
  }

  updatePrice(text: string): void {
    if (text === 'zero') {
      this.price = this.prices[0][0] * this.euro;
    }
    if (text === 'one') {
      this.price = this.prices[0][1] * this.euro;
    }

    this.price = Math.round(this.price * 100) / 100;
    this.iva = this.updateIva();
    this.iva = Math.round(this.iva * 100) / 100;
    this.totalPrice = this.price + this.iva;
    this.totalPrice = Math.round(this.totalPrice * 100) / 100;
  }

  addShoppingCartItem() {
    const newItem: ShoppingCardSheetDto = {
      name: this.title,
      material: this.material,
      finish: this.finish,
      capability: this.capabilities,
      unitsAvailable: parseInt(this.unitsEnabled),
      imgUrl: this.imgName,
      imgAlt: this.imgAlt,
      size: this.sizeDialog,
      engravingDepth: this.engravingDepthDialog,
      price: this.totalPrice,
    };

    this.cartItems.addItem(newItem);
  }

  defaultStateComponent(): void {
    try {
      this.price = this.prices[0][0] * this.euro;
      this.price = Math.round(this.price * 100) / 100;
      this.iva = this.price * 0.16;
      this.iva = Math.round(this.iva * 100) / 100;
      this.totalPrice = this.price + this.iva;
      this.totalPrice = Math.round(this.totalPrice * 100) / 100;
    } catch (e) {
      console.log('Error:', e);
    }
  }

  ngOnInit(): void {
    this.defaultStateComponent();
    this.getCardDescription();
    this.engravingDepthDialog = this.engravingDepth[0];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['euro'] || changes['prices']) {
      this.defaultStateComponent();
    }
  }
}
