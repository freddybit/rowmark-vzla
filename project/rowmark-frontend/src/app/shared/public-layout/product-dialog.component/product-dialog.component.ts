import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { Product } from '../../../models/entities/product';
import { ShoppingCardSheetDto } from '../../../models/dtos/shopping-card-sheet.dto';
import { CartManager } from '../../../managers/cart-manager/cart.manager';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-product-dialog',
  imports: [],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.css',
})
export class ProductDialogComponent {
  @Input() product!: Product;
  public cartManager = inject(CartManager);

  private sanitizer = inject(DomSanitizer);

  get safeVideoUrl(): SafeResourceUrl | null {
    if (!this.product?.videoUrl) {
      return null;
    }

    let finalUrl = this.product.videoUrl;
    if (finalUrl.includes('youtube.com/watch')) {
      try {
        const urlObj = new URL(finalUrl);
        const videoId = urlObj.searchParams.get('v');
        if (videoId) {
          finalUrl = `https://www.youtube.com/embed/${videoId}`;
        }
      } catch (e) {
        console.error('Error procesando URL de YouTube', e);
      }
    }
    else if (finalUrl.includes('youtu.be/')) {
      try {
        const urlObj = new URL(finalUrl);
        const videoId = urlObj.pathname.substring(1);
        if (videoId) {
          finalUrl = `https://www.youtube.com/embed/${videoId}`;
        }
      } catch (e) {
        console.error('Error procesando URL corta de YouTube', e);
      }
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(finalUrl);
  }

  @ViewChild('modalWindow') modalWindow!: ElementRef<HTMLDialogElement>;

  open() {
    this.modalWindow.nativeElement.showModal();
  }

  close() {
    this.modalWindow.nativeElement.close();
  }
}
