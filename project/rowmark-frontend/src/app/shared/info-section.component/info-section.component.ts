import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DolarApi, OficialEuro } from '../../services/dolar-api';

@Component({
  selector: 'app-info-section',
  imports: [],
  templateUrl: './info-section.component.html',
  styleUrl: './info-section.component.css',
})
export class InfoSectionComponent {

  private dolarService = inject(DolarApi);
  euroBs = signal<string>('Cargando...')

  dataEuro = signal<OficialEuro | null>(null);
  
  errorLoad = signal<string | null>(null);

  ngOnInit(): void {
    this.dolarService.getEuroBcv().subscribe({
      next: (data) => {
        this.dataEuro.set(data);
        this.euroBs.set(data.promedio.toFixed(4));
        console.log('Datos recibidos:', data);
      },
      error: (err) => {
        this.errorLoad.set('No se pudo obtener la tasa del BCV');
        console.error(err);
      }
    });
  }
}