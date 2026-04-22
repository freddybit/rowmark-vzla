import { Component, inject } from '@angular/core';
import { CartManager } from '../../managers/cart-manager/cart.manager';
import { ShoppingCartCardComponent } from "../../shared/shopping-cart-card.component/shopping-cart-card.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart.page',
  imports: [ShoppingCartCardComponent, FormsModule],
  templateUrl: './shopping-cart.page.html',
  styleUrl: './shopping-cart.page.css',
})
export class ShoppingCartPage {
  public cartManager = inject(CartManager);
  public customerName: string = '';

  // Generador dinámico del mensaje para el equipo de ventas
  sendWhatsAppOrder() {
    const items = this.cartManager.getItems();
    if (items.length === 0) return;

    const phoneNumber = '584144260603';
    let text = `Hola soy ${this.customerName}, me interesa realizar el siguiente pedido del catálogo de Rowmark:\n\n`;

    // Recorremos el carrito para listar cada lámina
    items.forEach((item, index) => {
      text += `${index + 1}. *${item.name}* (${item.material} - ${item.finish})\n`;
      text += `   Grosor: ${item.size}mm | Precio: ${item.price} Bs.\n`;
    });

    text += `\n*Total a pagar: ${this.cartManager.cartTotal()} Bs.*`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');

    this.cartManager.clearCart();
  }
}
