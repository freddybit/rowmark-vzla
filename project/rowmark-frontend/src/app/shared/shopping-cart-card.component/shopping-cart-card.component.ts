import { Component, inject, Input, input } from '@angular/core';
import { CartManager } from '../../managers/cart-manager/cart.manager';
import { ShoppingCardSheetDto } from '../../models/dtos/shopping-card-sheet.dto';

@Component({
  selector: 'app-shopping-cart-card',
  imports: [],
  templateUrl: './shopping-cart-card.component.html',
  styleUrl: './shopping-cart-card.component.css',
})
export class ShoppingCartCardComponent {

  public cartManager = inject(CartManager);
  @Input() item!: ShoppingCardSheetDto;

}
