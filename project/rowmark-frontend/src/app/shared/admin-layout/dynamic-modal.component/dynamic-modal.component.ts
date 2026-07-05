import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface DynamicField {
  key: string;
  label: string;
  // 👇 Agregamos 'file' a las opciones
  type: 'text' | 'number' | 'color' | 'textarea' | 'file';
  required?: boolean;
  placeholder?: string;
  // 👇 Útil para limitar a solo imágenes (Ej: 'image/png, image/jpeg')
  accept?: string;
}

@Component({
  selector: 'app-dynamic-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dynamic-modal.component.html',
  styleUrl: './dynamic-modal.component.css',
})
export class DynamicModalComponent implements OnInit {
  @Input() titulo: string = 'Crear Registro';
  @Input() campos: DynamicField[] = [];
  @Input() datosIniciales: any = {};

  @Output() onSave = new EventEmitter<any>();
  @Output() onClose = new EventEmitter<void>();

  formData: any = {};

  ngOnInit() {
    this.formData = { ...this.datosIniciales };
  }

  cerrar() {
    this.onClose.emit();
  }

  // 👇 Método nuevo para atrapar el archivo real desde el input de HTML
  onFileSelected(event: Event, key: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // Guardamos el objeto nativo "File" completo en nuestro formData
      this.formData[key] = input.files[0];
    }
  }

  // 👇 Utilidad para el HTML (saber si lo que tenemos es una URL o un File nuevo)
  isString(value: any): boolean {
    return typeof value === 'string';
  }

  guardar() {
    for (let campo of this.campos) {
      if (campo.required && !this.formData[campo.key]) {
        alert(`Por favor, completa el campo obligatorio: ${campo.label}`);
        return;
      }
    }
    this.onSave.emit(this.formData);
  }
}
