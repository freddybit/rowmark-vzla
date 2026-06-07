import { Component } from '@angular/core';
import { Color } from '../../../models/entities/color';
import { Usage } from '../../../models/entities/usage';

@Component({
  selector: 'app-usage-management.component',
  imports: [],
  templateUrl: './usage-management.component.html',
  styleUrl: './usage-management.component.css',
})
export class UsageManagementComponent {

 selectedUsage: Usage = { id: 0, name: '', imgUrl: '', description: '', iconUrl: '' };

  usages: Usage[] = [
    {
      id: 1,
      name: 'Uso 1',
      description: 'Descripción del Uso 1',
      imgUrl: 'https://via.placeholder.com/150',
      iconUrl: 'https://via.placeholder.com/50',
    },
    {
      id: 2,
      name: 'Uso 2',
      description: 'Descripción del Uso 2',
      imgUrl: 'https://via.placeholder.com/150',
      iconUrl: 'https://via.placeholder.com/50',
    },
    {
      id: 3,
      name: 'Uso 3',
      description: 'Descripción del Uso 3',
      imgUrl: 'https://via.placeholder.com/150',
      iconUrl: 'https://via.placeholder.com/50',
    },
  ];

  addUsage(name: string): void {
    const newUsage: Usage = {
      id: this.usages.length > 0 ? Math.max(...this.usages.map((u) => u.id)) + 1 : 1,
      name: name,
      imgUrl: '',
      description: '',
      iconUrl: '',
    };
    this.usages.push(newUsage);
  }

  selectUsage(usage: Usage): void {
    this.selectedUsage = usage;
  }

  deselectUsage(): void {
    this.selectedUsage = { id: 0, name: '', imgUrl: '', description: '', iconUrl: '' };
  }

  deleteUsage(id: number): void {
    this.usages = this.usages.filter((usage) => usage.id !== id);
    if (this.selectedUsage.id === id) {
      this.deselectUsage();
    }
  }

}
