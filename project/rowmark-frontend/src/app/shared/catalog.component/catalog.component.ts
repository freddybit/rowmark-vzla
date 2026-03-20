import { Component } from '@angular/core';
import { ProductCardComponent } from "../product-card.component/product-card.component";

@Component({
  selector: 'app-catalog',
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent {

}
