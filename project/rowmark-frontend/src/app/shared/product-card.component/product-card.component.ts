import { Component, ElementRef, inject, Input, OnInit, signal, ViewChild } from '@angular/core';
import { RouterLink } from "@angular/router";
import { DolarApi } from '../../services/dolar-api';

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
  @Input() prices: Array<number> = [0];

  // Model Window inputs
  @Input() euro: number = 0;
  @Input() description: string = '';
  @Input() material: string = '';
  @Input() finish: string = '';
  @Input() attributes: string = '';
  @Input() usage: string = '';
  @Input() capabilities: string = '';
  @Input() colors: Array<string> = [];
  @Input() unitsEnabled: string = '';
  @Input() engravingDepth: Array<number> = [0];
  @Input() engravingDepthDialog: number = 0;
  
  price: number = this.prices[0];
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

  oneEngravingDepth(): boolean {
    if (this.engravingDepth.length == 1) return true;
    return false;
  }

  updateIva(): number {
    return (this.price * 0.16);
  }

  updatePrice(text: string): void {
    if (text === 'zero') {
      this.price = (this.prices[0]*this.euro);
      this.engravingDepthDialog = this.engravingDepth[0];
    }
    if (text === 'one') {
      this.price = (this.prices[1]*this.euro);
      this.engravingDepthDialog = this.engravingDepth[1];
    }

    this.price = Math.round(this.price * 10000) / 10000;
    this.iva = this.updateIva();
    this.iva = Math.round(this.iva * 10000) / 10000;
    this.totalPrice = this.price+this.iva;
    this.totalPrice = Math.round(this.totalPrice * 10000) / 10000;
  }

  defaultStateComponent(): void {
    try {
        this.price = (this.prices[0] * this.euro);
        this.price = Math.round(this.price * 10000) / 10000;
        this.iva = this.price * 0.16;
        this.iva = Math.round(this.iva * 10000) / 10000;
        this.totalPrice = this.price + this.iva;
        this.totalPrice = Math.round(this.totalPrice * 10000) / 10000;
    } catch (e) {
      console.log('Error:', e);
    }
  }

  ngOnInit(): void {
    
    this.defaultStateComponent();
    this.getCardDescription();
    this.engravingDepthDialog = this.engravingDepth[0];

  }
  
}
