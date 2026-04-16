import { Injectable, signal, effect, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ShoppingCardSheetDto } from '../../models/dtos/shopping-card-sheet.dto';
import { Product } from '../../models/entities/product';

@Injectable({ providedIn: 'root' })
export class CartManager {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private cartItems = signal<ShoppingCardSheetDto[]>(this.loadFromStorage());
  public totalItems = computed(() => this.cartItems().length);

  constructor() {
    effect(() => {
      if (this.isBrowser) {
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems()));
      }
    });
  }

  private loadFromStorage(): ShoppingCardSheetDto[] {
    if (this.isBrowser) {
      const saved = localStorage.getItem('cartItems');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  }

  public addItem(newItem: ShoppingCardSheetDto) {
    this.cartItems.update((items) => [...items, newItem]);
  }

  public removeItem(productName: string) {
    this.cartItems.update((items) => items.filter((item) => item.name !== productName));
  }

  public clearCart() {
    this.cartItems.set([]);
  }

  public getItems = this.cartItems.asReadonly();

  public cartTotal = computed(() => {
    const total = this.cartItems().reduce((acc, item) => acc + item.price, 0);
    return Number(total.toFixed(2));
  });

  public addShoppingCartItem(product: Product) {
    const newItem: ShoppingCardSheetDto = {
      name: product.name,
      material: product.material,
      finish: product.finish,
      capability: product.capabilities,
      unitsAvailable: parseInt(product.unitsAvailable.toString()),
      imgUrl: product.imgUrl,
      imgAlt: product.imgAlt,
      size: product.size,
      engravingDepth: product.engravingDepth,
      price: product.totalPrice,
    };

    this.addItem(newItem);
  }
}
