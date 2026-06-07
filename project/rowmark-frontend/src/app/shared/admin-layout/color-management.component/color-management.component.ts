import { Component } from '@angular/core';
import { Color } from '../../../models/entities/color';

@Component({
  selector: 'app-color-management',
  imports: [],
  templateUrl: './color-management.component.html',
  styleUrl: './color-management.component.css',
})
export class ColorManagementComponent {
  selectedColor: Color = { id: 0, name: '', imgUrl: '', surfaceHex: '', coreHex: '' };

  colors: Color[] = [
    {
      id: 1,
      name: 'Rojo',
      imgUrl:
        'https://images.unsplash.com/flagged/photo-1593005510509-d05b264f1c9c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9uZG8lMjByb2pvfGVufDB8fDB8fHww',
      surfaceHex: '#FF0000',
      coreHex: '#CC0000',
    },
    {
      id: 2,
      name: 'Verde',
      imgUrl:
        'https://img.freepik.com/vector-premium/fondo-abstracto-rayos-degradados-colores-verdes_444390-1278.jpg?semt=ais_hybrid&w=740&q=80',
      surfaceHex: '#00FF00',
      coreHex: '#00CC00',
    },
    {
      id: 3,
      name: 'Azul',
      imgUrl:
        'https://img.magnific.com/foto-gratis/fondo-papel-tapiz-artistico-borroso-colorido_58702-8344.jpg?semt=ais_hybrid&w=740&q=80',
      surfaceHex: '#0000FF',
      coreHex: '#0000CC',
    },
  ];

  addMaterial(name: string): void {
    const newColor: Color = {
      id: this.colors.length > 0 ? Math.max(...this.colors.map((m) => m.id)) + 1 : 1,
      name: name,
      imgUrl: '',
      surfaceHex: '',
      coreHex: '',
    };
    this.colors.push(newColor);
  }

  selectMaterial(color: Color): void {
    this.selectedColor = color;
  }

  deselectColor(): void {
    this.selectedColor = { id: 0, name: '', imgUrl: '', surfaceHex: '', coreHex: '' };
  }

  deleteColor(id: number): void {
    this.colors = this.colors.filter((colors) => colors.id !== id);
    if (this.selectedColor.id === id) {
      this.deselectColor();
    }
  }
}
