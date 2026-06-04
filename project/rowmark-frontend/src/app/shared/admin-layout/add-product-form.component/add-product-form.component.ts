import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-product-form',
  standalone: true, // Asumo que es standalone por tu array de imports en el decorador
  imports: [ReactiveFormsModule],
  templateUrl: './add-product-form.component.html',
  styleUrl: './add-product-form.component.css',
})
export class AddProductFormComponent implements OnInit {
  sheetForm!: FormGroup;
  selectedFile: File | null = null;
  public readonly availableSizes: string[] = ['120x60', '60x60', '30x60'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.sheetForm = this.fb.group({
      name: ['', Validators.required],
      unitsAvailable: [0, [Validators.required, Validators.min(0)]],
      imgFile: [null],
      imgAlt: [''],
      description: [''],
      material: [''],
      finish: [''],
      attributes: [''],
      usage: [''],
      capabilities: [''],
      prices: this.fb.array([]),
      engravingDepth: this.fb.array([]),
      sizes: this.fb.array([], Validators.required),
      videoUrls: this.fb.array([]),
    });
  }

  // =========================================================================
  // Getters para FormArrays
  // =========================================================================

  get prices(): FormArray {
    return this.sheetForm.get('prices') as FormArray;
  }
  get engravingDepth(): FormArray {
    return this.sheetForm.get('engravingDepth') as FormArray;
  }
  get sizes(): FormArray {
    return this.sheetForm.get('sizes') as FormArray;
  }
  get videoUrls(): FormArray {
    return this.sheetForm.get('videoUrls') as FormArray;
  }

  // =========================================================================
  // Manipulación de Arreglos Dinámicos
  // =========================================================================

  addPrice(): void {
    this.prices.push(this.fb.control(null, [Validators.required, Validators.min(0)]));
  }
  removePrice(index: number): void {
    this.prices.removeAt(index);
  }

  addDepth(): void {
    this.engravingDepth.push(this.fb.control(null, [Validators.required, Validators.min(0)]));
  }
  removeDepth(index: number): void {
    this.engravingDepth.removeAt(index);
  }

  addVideo(): void {
    this.videoUrls.push(this.fb.control(''));
  }
  removeVideo(index: number): void {
    this.videoUrls.removeAt(index);
  }

  // =========================================================================
  // Eventos de la Interfaz (Archivos y Checkboxes)
  // =========================================================================

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.sheetForm.patchValue({ imgFile: this.selectedFile });
      this.sheetForm.get('imgFile')?.updateValueAndValidity();
    }
  }

  onSizeChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      this.sizes.push(this.fb.control(checkbox.value));
    } else {
      const index = this.sizes.controls.findIndex((ctrl) => ctrl.value === checkbox.value);
      if (index !== -1) {
        this.sizes.removeAt(index);
      }
    }
  }

  // =========================================================================
  // Envío del Formulario
  // =========================================================================

  onSubmit(): void {
    if (this.sheetForm.valid) {
      // Aquí tienes tu objeto puro y el archivo físico separados.
      // Ya puedes aplicar tu propia lógica de servicios o mapeo hacia C#.
      const formValues = this.sheetForm.value;
      const fileToUpload = this.selectedFile;

      console.log('Datos del formulario listos:', formValues);
      if (fileToUpload) {
        console.log('Archivo listo para procesar:', fileToUpload.name);
      }
    } else {
      console.warn('Faltan campos por llenar o hay errores.');
      this.sheetForm.markAllAsTouched();
    }
  }
}
