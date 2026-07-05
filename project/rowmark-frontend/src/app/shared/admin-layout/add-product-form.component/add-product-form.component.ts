import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

// Importaciones de tus catálogos
import { CapabilityService } from '../../../services/rowmark-api/capability-service/capability.service';
import { ColorService } from '../../../services/rowmark-api/color-service/color.service';
import { FinishService } from '../../../services/rowmark-api/finish-service/finish.service';
import { MaterialService } from '../../../services/rowmark-api/material-service/material.service';
import { ProductService } from '../../../services/rowmark-api/product-service/product.service';
import { SheetSizeService } from '../../../services/rowmark-api/sheet-size-service/sheet-size.service';
import { DeepthService } from '../../../services/rowmark-api/deepth-service/deepth.service';
import { AttributeService } from '../../../services/rowmark-api/attribute-service/attribute.service';
import { SupabaseService } from '../../../services/supabase-service/supabase.service';

interface ProductDimension {
  engravingDepthKey: number;
  sheetSizeKey: number;
  productPrice: number;
  unitsAvailable: number;
}

interface ProductDTO {
  name: string;
  description: string;
  imgUrl: string;
  imgAlt: string;
  videoUrl: string;
  colorKeys: number[];
  materialKeys: number[];
  finishKeys: number[];
  attributesKeys: number[];
  capabilitiesKeys: number[];
  dimensions: ProductDimension[];
  profileKey: number;
}

@Component({
  selector: 'app-add-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product-form.component.html',
  styleUrl: './add-product-form.component.css',
})
export class AddProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  private productService = inject(ProductService);
  private colorService = inject(ColorService);
  private materialService = inject(MaterialService);
  private finishService = inject(FinishService);
  private capabilityService = inject(CapabilityService);
  private depthService = inject(DeepthService);
  private sizeService = inject(SheetSizeService);
  private attributeService = inject(AttributeService);

  // INYECCIÓN DE SUPABASE
  private supabaseService = inject(SupabaseService);

  currentStep = signal<number>(1);
  isSubmitting = signal<boolean>(false);
  isUploadingImage = signal<boolean>(false);

  availableColors = signal<any[]>([]);
  availableMaterials = signal<any[]>([]);
  availableFinishes = signal<any[]>([]);
  availableCapabilities = signal<any[]>([]);
  availableDepths = signal<any[]>([]);
  availableSizes = signal<any[]>([]);
  availableAttributes = signal<any[]>([]);

  productForm: FormGroup;

  constructor() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      videoUrl: [''],
      imgUrl: ['', [Validators.required]],
      imgAlt: ['', [Validators.required]],

      colorKeys: [[]],
      materialKeys: [[]],
      finishKeys: [[]],
      attributesKeys: [[]],
      capabilitiesKeys: [[]],
      dimensions: this.fb.array([this.createDimensionRow()]),
      profileKey: [localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!).profileKey : null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCatalogs();
  }

  loadCatalogs(): void {
    this.colorService.getAll().subscribe((data) => this.availableColors.set(data));
    this.materialService.getAll().subscribe((data) => this.availableMaterials.set(data));
    this.finishService.getAll().subscribe((data) => this.availableFinishes.set(data));
    this.capabilityService.getAll().subscribe((data) => this.availableCapabilities.set(data));
    this.depthService.getAll().subscribe((data) => this.availableDepths.set(data));
    this.sizeService.getAll().subscribe((data) => this.availableSizes.set(data));
    this.attributeService.getAll().subscribe((data) => this.availableAttributes.set(data));
  }

  // --- LÓGICA DE SUPABASE ---
  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    this.isUploadingImage.set(true);

    try {
      const publicUrl = await this.supabaseService.uploadImage(file);
      this.productForm.patchValue({ imgUrl: publicUrl });

      if (!this.productForm.get('imgAlt')?.value) {
        this.productForm.patchValue({ imgAlt: file.name.split('.')[0] });
      }
    } catch (error) {
      alert('Hubo un error al subir la imagen. Revisa la consola.');
    } finally {
      this.isUploadingImage.set(false);
    }
  }

  // --- MATRIZ DINÁMICA ---
  get dimensionsArray(): FormArray {
    return this.productForm.get('dimensions') as FormArray;
  }

  createDimensionRow(): FormGroup {
    return this.fb.group({
      engravingDepthKey: [null, Validators.required],
      sheetSizeKey: [null, Validators.required],
      productPrice: [null, [Validators.required, Validators.min(0.01)]],
      unitsAvailable: [null, [Validators.required, Validators.min(0)]],
    });
  }

  addDimensionRow(): void {
    this.dimensionsArray.push(this.createDimensionRow());
  }

  removeDimensionRow(index: number): void {
    if (this.dimensionsArray.length > 1) {
      this.dimensionsArray.removeAt(index);
    }
  }

  // --- SELECCIÓN MÚLTIPLE ---
  toggleSelection(controlName: string, key: number): void {
    const control = this.productForm.get(controlName);
    const currentValues: number[] = control?.value || [];
    if (currentValues.includes(key)) {
      control?.setValue(currentValues.filter((v) => v !== key));
    } else {
      control?.setValue([...currentValues, key]);
    }
    control?.markAsTouched();
  }

  isSelected(controlName: string, key: number): boolean {
    return this.productForm.get(controlName)?.value?.includes(key);
  }

  // --- STEPPER ---
  nextStep(): void {
    if (this.currentStep() < 3) this.currentStep.update((s) => s + 1);
  }

  prevStep(): void {
    if (this.currentStep() > 1) this.currentStep.update((s) => s - 1);
  }

  // --- ENVÍO AL BACKEND ---
  onSubmit(): void {
    if (this.productForm.valid) {
      this.isSubmitting.set(true);
      const payload: ProductDTO = this.productForm.value;

      console.log('JSON listo para enviarse a la API:', payload);

      this.productService.createProduct(payload).subscribe({
        next: (response) => {
          this.isSubmitting.set(false);
          alert('¡Producto creado e insertado transaccionalmente en la base de datos con éxito!');
          this.productForm.reset();
          this.dimensionsArray.clear();
          this.addDimensionRow();
          this.currentStep.set(1);
        },
        error: (err) => {
          this.isSubmitting.set(false);
          console.error('Error al enviar el producto a la API:', err);
          alert('Hubo un error al guardar el producto. Revisa la consola para más detalles.');
        },
      });
    } else {
      this.productForm.markAllAsTouched();
      alert('Revisa los campos en rojo. Faltan llaves foráneas o información requerida.');
    }
  }
}
