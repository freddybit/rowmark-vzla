import { Component, inject, ViewChild } from '@angular/core';
import { CartManager } from '../../managers/cart-manager/cart.manager';
import { ShoppingCartCardComponent } from "../../shared/shopping-cart-card.component/shopping-cart-card.component";
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ErrorDialogComponent } from "../../shared/error-dialog.component/error-dialog.component";


@Component({
  selector: 'app-shopping-cart.page',
  imports: [ShoppingCartCardComponent, FormsModule, RouterLink, ErrorDialogComponent],
  templateUrl: './shopping-cart.page.html',
  styleUrl: './shopping-cart.page.css',
})
export class ShoppingCartPage {
  public cartManager = inject(CartManager);
  public customerName: string = '';
  @ViewChild('modalError') modalError!: ErrorDialogComponent;

  sendWhatsAppOrder() {
    const items = this.cartManager.getItems();

    if (items.length === 0 || !this.customerName.trim()) {
      this.modalError.open();
      return;
    }

    const phoneNumber = '584144260603';
    let text = `Hola soy *${this.customerName}*, me interesa realizar el siguiente pedido del catálogo de Rowmark:\n\n`;

    items.forEach((item, index) => {
      text += `${index + 1}. *${item.name}* (${item.material} - ${item.finish})\n`;
      text += `   Tamaño: ${item.size}cm | Grosor: ${item.engravingDepth}mm | Precio: ${item.price} Bs.\n`;
    });

    const subtotal = this.cartManager.cartSubtotal();
    const total = this.cartManager.cartTotal();
    const iva = (Number(total) - Number(subtotal)).toFixed(2);

    text += `\n*Subtotal:* ${subtotal} Bs.`;
    text += `\n*IVA:* ${iva} Bs.`;
    text += `\n*Total a pagar: ${total} Bs.*`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');

    this.cartManager.clearCart();
  }
}
