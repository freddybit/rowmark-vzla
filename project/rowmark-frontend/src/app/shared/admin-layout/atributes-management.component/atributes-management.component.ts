import { Component } from '@angular/core';
import { Attribute } from '../../../models/entities/attribute';

@Component({
  selector: 'app-atributes-management.component',
  imports: [],
  templateUrl: './atributes-management.component.html',
  styleUrl: './atributes-management.component.css',
})
export class AtributesManagementComponent {
  selectedAttribute: Attribute = { id: 0, name: '', imgUrl: '', iconUrl: '', description: '' };

  attributes: Attribute[] = [
    {
      id: 1,
      name: 'Fibra de Densidad Media (MDF)',
      description:
        'La fibra de densidad media (MDF) es un material compuesto hecho de fibras de madera comprimidas y unido con adhesivos.',
      imgUrl:
        'https://tse2.mm.bing.net/th/id/OIP.ruDUGqmS0CNXFLH1qRWkYAHaE8?r=0&cb=thfvnextfalcon&rs=1&pid=ImgDetMain&o=7&rm=3',
      iconUrl:
        'https://tse2.mm.bing.net/th/id/OIP.ruDUGqmS0CNXFLH1qRWkYAHaE8?r=0&cb=thfvnextfalcon&rs=1&pid=ImgDetMain&o=7&rm=3',
    },
    {
      id: 2,
      name: 'Contrachapado',
      description:
        'El contrachapado es un material compuesto hecho de capas delgadas de madera pegadas entre sí con las fibras de cada capa orientadas en direcciones alternas.',
      imgUrl:
        'https://tse1.mm.bing.net/th/id/OIP.9n2s8Xo7l3mLh0a5e7j8wHaE8?r=0&cb=thfvnextfalcon&rs=1&pid=ImgDetMain&o=7&rm=3',
      iconUrl:
        'https://tse1.mm.bing.net/th/id/OIP.9n2s8Xo7l3mLh0a5e7j8wHaE8?r=0&cb=thfvnextfalcon&rs=1&pid=ImgDetMain&o=7&rm=3',
    },
    {
      id: 3,
      name: 'Aglomerado',
      description:
        'El aglomerado es un material compuesto hecho de partículas de madera o纤维 de madera pegadas entre sí con adhesivos.',
      imgUrl:
        'https://tse3.mm.bing.net/th/id/OIP.raY1I7m0vPLI3KIRq_3oDwHaEK?r=0&cb=thfvnextfalcon&rs=1&pid=ImgDetMain&o=7&rm=3',
      iconUrl:
        'https://tse3.mm.bing.net/th/id/OIP.raY1I7m0vPLI3KIRq_3oDwHaEK?r=0&cb=thfvnextfalcon&rs=1&pid=ImgDetMain&o=7&rm=3',
    }
  ];

  addAttribute(name: string): void {
    const newAttribute: Attribute = {
      id: this.attributes.length > 0 ? Math.max(...this.attributes.map((a) => a.id)) + 1 : 1,
      name: name,
      imgUrl: '',
      iconUrl: '',
      description: '',
    };
    this.attributes.push(newAttribute);
  }

  selectAttribute(attribute: Attribute): void {
    this.selectedAttribute = attribute;
  }

  deselectAttribute(): void {
    this.selectedAttribute = { id: 0, name: '', imgUrl: '', iconUrl: '', description: '' };
  }

  deleteAttribute(id: number): void {
    this.attributes = this.attributes.filter((attribute) => attribute.id !== id);
    if (this.selectedAttribute.id === id) {
      this.deselectAttribute();
    }
  }

}
