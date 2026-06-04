import { Component } from '@angular/core';

@Component({
  selector: 'app-material-management',
  imports: [],
  templateUrl: './material-management.component.html',
  styleUrl: './material-management.component.css',
})
export class MaterialManagementComponent {

  selectedMaterial: Material = { id: 0, name: '', imgUrl: '', category: '', description: '' };

    materials: Material[] = [
    { id: 1, name: 'Fibra de Densidad Media (MDF)', category: 'Madera', description: 'La fibra de densidad media (MDF) es un material compuesto hecho de fibras de madera comprimidas y unido con adhesivos.', imgUrl: 'https://tse2.mm.bing.net/th/id/OIP.ruDUGqmS0CNXFLH1qRWkYAHaE8?r=0&cb=thfvnextfalcon&rs=1&pid=ImgDetMain&o=7&rm=3' },
    { id: 2, name: 'Material 2', category: 'Plástico', description: 'El plástico es un material sintético ampliamente utilizado en la industria y el consumo diario, conocido por su ligereza, durabilidad y versatilidad en la fabricación de diversos productos.', imgUrl: 'https://tse1.mm.bing.net/th/id/OIP.FGaiFYn85RKz39GvDNGyhgHaD3?r=0&cb=thfvnextfalcon&rs=1&pid=ImgDetMain&o=7&rm=3' },
    { id: 3, name: 'Material 3', category: 'Metal', description: 'El metal es un material natural, ampliamente utilizado en la industria y la construcción, conocido por su resistencia, durabilidad y capacidad de conductividad térmica y eléctrica.', imgUrl: 'https://tse3.mm.bing.net/th/id/OIP.raY1I7m0vPLI3KIRq_3oDwHaEK?r=0&cb=thfvnextfalcon&rs=1&pid=ImgDetMain&o=7&rm=3' },
  ];

  addMaterial(name: string): void {
    const newMaterial: Material = {
      id: this.materials.length > 0 ? Math.max(...this.materials.map(m => m.id)) + 1 : 1,
      name: name,
      imgUrl: '',
      category: '',
      description: ''
    };
    this.materials.push(newMaterial);
  }

  selectMaterial(material: Material): void {
    this.selectedMaterial = material;
  }

  deselectMaterial(): void {
    this.selectedMaterial = { id: 0, name: '', imgUrl: '', category: '', description: '' };
  }

  deleteMaterial(id: number): void {
    this.materials = this.materials.filter(material => material.id !== id);
    if (this.selectedMaterial.id === id) {
      this.deselectMaterial();
    }
  }

}
