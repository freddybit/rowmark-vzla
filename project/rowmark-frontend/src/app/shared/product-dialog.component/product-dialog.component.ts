import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { Product } from '../../models/entities/product';
import { ShoppingCardSheetDto } from '../../models/dtos/shopping-card-sheet.dto';
import { CartManager } from '../../managers/cart-manager/cart.manager';

@Component({
  selector: 'app-product-dialog',
  imports: [],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.css',
})
export class ProductDialogComponent {
  @Input() product!: Product;
  public cartManager = inject(CartManager);

  @ViewChild('modalWindow') modalWindow!: ElementRef<HTMLDialogElement>;

  open() {
    this.modalWindow.nativeElement.showModal();
  }

  close() {
    this.modalWindow.nativeElement.close();
  }

}
