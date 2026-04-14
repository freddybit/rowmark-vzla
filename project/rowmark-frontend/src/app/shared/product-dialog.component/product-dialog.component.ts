import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Product } from '../../models/entities/product';
import { ShoppingCardSheetDto } from '../../models/dtos/shopping-card-sheet.dto';

@Component({
  selector: 'app-product-dialog',
  imports: [],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.css',
})
export class ProductDialogComponent {
  @Input() product!: Product;

  @ViewChild('modalWindow') modalWindow!: ElementRef<HTMLDialogElement>;

  open() {
    this.modalWindow.nativeElement.showModal();
  }

  close() {
    this.modalWindow.nativeElement.close();
  }

  addShoppingCartItem() {
    const newItem: ShoppingCardSheetDto = {
      name: this.product.name,
      material: this.product.material,
      finish: this.product.finish,
      capability: this.product.capabilities,
      unitsAvailable: parseInt(this.product.unitsAvailable.toString()),
      imgUrl: this.product.imgUrl,
      imgAlt: this.product.imgAlt,
      size: this.product.size,
      engravingDepth: this.product.engravingDepth,
      price: this.product.totalPrice,
    };
  }
}
