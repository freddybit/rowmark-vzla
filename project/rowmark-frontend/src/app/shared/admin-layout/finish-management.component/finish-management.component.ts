import { Component } from '@angular/core';
import { Finish } from '../../../models/entities/finish';

@Component({
  selector: 'app-finish-management.component',
  imports: [],
  templateUrl: './finish-management.component.html',
  styleUrl: './finish-management.component.css',
})
export class FinishManagementComponent {

  selectedFinish: Finish = { id: 0, name: '', imgUrl: '', description: '' };

  finishes: Finish[] = [
    {
      id: 1,
      name: 'Fibra de Densidad Media (MDF)',
      description:
        'La fibra de densidad media (MDF) es un material compuesto hecho de fibras de madera comprimidas y unido con adhesivos.',
      imgUrl:
        'https://tse2.mm.bing.net/th/id/OIP.ruDUGqmS0CNXFLH1qRWkYAHaE8?r=0&cb=thfvnextfalcon&rs=1&pid=ImgDetMain&o=7&rm=3',
    },
    {
      id: 2,
      name: 'Material 2',
      description:
        'El plástico es un material sintético ampliamente utilizado en la industria y el consumo diario, conocido por su ligereza, durabilidad y versatilidad en la fabricación de diversos productos.',
      imgUrl:
        'https://tse1.mm.bing.net/th/id/OIP.FGaiFYn85RKz39GvDNGyhgHaD3?r=0&cb=thfvnextfalcon&rs=1&pid=ImgDetMain&o=7&rm=3',
    },
    {
      id: 3,
      name: 'Material 3',
      description:
        'El metal es un material natural, ampliamente utilizado en la industria y la construcción, conocido por su resistencia, durabilidad y capacidad de conductividad térmica y eléctrica.',
      imgUrl:
        'https://tse3.mm.bing.net/th/id/OIP.raY1I7m0vPLI3KIRq_3oDwHaEK?r=0&cb=thfvnextfalcon&rs=1&pid=ImgDetMain&o=7&rm=3',
    },
  ];

  addFinish(name: string): void {
    const newFinish: Finish = {
      id: this.finishes.length > 0 ? Math.max(...this.finishes.map((f) => f.id)) + 1 : 1,
      name: name,
      imgUrl: '',
      description: '',
    };
    this.finishes.push(newFinish);
  }

  selectFinish(finish: Finish): void {
    this.selectedFinish = finish;
  }

  deselectFinish(): void {
    this.selectedFinish = { id: 0, name: '', imgUrl: '', description: '' };
  }

  deleteFinish(id: number): void {
    this.finishes = this.finishes.filter((finish) => finish.id !== id);
    if (this.selectedFinish.id === id) {
      this.deselectFinish();
    }
  }

}
