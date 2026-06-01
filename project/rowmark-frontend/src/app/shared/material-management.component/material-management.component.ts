import { Component } from '@angular/core';

@Component({
  selector: 'app-material-management',
  imports: [],
  templateUrl: './material-management.component.html',
  styleUrl: './material-management.component.css',
})
export class MaterialManagementComponent {

  selectedMaterial: Material = {id: 0, name: ''};

  materials: Material[] = [
    { id: 1, name: 'Material 1' },
    { id: 2, name: 'Material 2' },
    { id: 3, name: 'Material 3' },
  ];

  addMaterial(name: string): void {
    const newMaterial: Material = {
      id: this.materials.length > 0 ? Math.max(...this.materials.map(m => m.id)) + 1 : 1,
      name: name
    };
    this.materials.push(newMaterial);
  }

  selectMaterial(material: Material): void {
    this.selectedMaterial = material;
  }

  deselectMaterial(): void {
    this.selectedMaterial = {id: 0, name: ''};
  }

  deleteMaterial(id: number): void {
    this.materials = this.materials.filter(material => material.id !== id);
    if (this.selectedMaterial.id === id) {
      this.deselectMaterial();
    }
  }

}
