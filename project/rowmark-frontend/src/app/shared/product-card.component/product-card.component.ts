import { ArrayType, DomElementSchemaRegistry } from '@angular/compiler';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit {

  // Card inputs
  @Input() imgName: string = '';
  @Input() imgAlt: string = '';
  @Input() title: string = '';
  @Input() usability: string = '';
  @Input() priceOne: number = 0;
  @Input() priceTwo: number = 0;
  @Input() priceThree: number = 0;

  // Model Window inputs
  @Input() description: string = '';
  @Input() material: string = '';
  @Input() finish: string = '';
  @Input() attributes: string = '';
  @Input() usage: string = '';
  @Input() capabilities: string = '';
  @Input() colors: Array<string> = [];
  
  price: number = this.priceOne;
  iva: number = this.price * 0.16;
  totalPrice: number = this.price + this.iva;
  cardDescription: string = '';

  @ViewChild('modalWindow') modalWindow!: ElementRef<HTMLDialogElement>;

  openModal():void {
    this.modalWindow.nativeElement.showModal();
  }

  closeModal():void {
    this.modalWindow.nativeElement.close();
  }

  getCardDescription(): void {
    if (this.description.length > 90) this.cardDescription = (this.description.slice(0, 90) + '...');
    else this.cardDescription = this.description;
  }

  updateIva(): number {
    return (this.price * 0.16);
  } 

  updatePrice(btn: HTMLElement): void {
    if (!btn) return;

    if (btn.textContent === 'Lámina') {
      this.price = this.priceOne;
    }
    else if (btn.textContent === '1/2') {
      this.price = this.priceTwo;
    }
    else if (btn.textContent === '1/4') {
      this.price = this.priceThree;
    }
    this.iva = this.updateIva();

    this.totalPrice = this.price+this.iva;
  }

  ngOnInit(): void {
    this.price = this.priceOne;
    this.iva = this.price * 0.16;
    this.totalPrice = this.price + this.iva;   

    this.getCardDescription()
  }
  
}
