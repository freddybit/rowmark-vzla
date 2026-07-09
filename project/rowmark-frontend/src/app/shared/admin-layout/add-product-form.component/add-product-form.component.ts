import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  colorKeys: number[] ;
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
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public productIdToEdit: number | null = null;

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
      profileKey: [
        localStorage.getItem('currentUser')
          ? JSON.parse(localStorage.getItem('currentUser')!).profileKey
          : null,
        Validators.required,
      ],
    });
  }

  ngOnInit(): void {
    this.loadCatalogs();

    // 👇 Leemos si viene un ID en la URL
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.productIdToEdit = Number(idParam);
      this.fetchAndLoadProduct(this.productIdToEdit);
    }
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

  fetchAndLoadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (productoDB: any) => {
        const mappedColorKeys =
          productoDB.colors?.map((c: any) => c.colorKey) || productoDB.colorKeys || [];
        const mappedMaterialKeys =
          productoDB.materials?.map((m: any) => m.materialKey) || productoDB.materialKeys || [];
        const mappedFinishKeys =
          productoDB.finishes?.map((f: any) => f.finishKey) || productoDB.finishKeys || [];
        const mappedAttributeKeys =
          productoDB.attributes?.map((a: any) => a.attributeKey) || productoDB.attributesKeys || [];
        const mappedCapabilityKeys =
          productoDB.capabilities?.map((c: any) => c.capabilityKey) ||
          productoDB.capabilitiesKeys ||
          [];

        this.productForm.patchValue({
          name: productoDB.name,
          description: productoDB.description,
          videoUrl: productoDB.videoUrl || '',
          imgUrl: productoDB.imgUrl,
          imgAlt: productoDB.imgAlt || productoDB.name,
          colorKeys: mappedColorKeys,
          materialKeys: mappedMaterialKeys,
          finishKeys: mappedFinishKeys,
          attributesKeys: mappedAttributeKeys,
          capabilitiesKeys: mappedCapabilityKeys,
          profileKey: productoDB.profileKey || this.productForm.get('profileKey')?.value,
        });

        const dimensionesBackend = productoDB.dimensions || productoDB.productDimensions || [];

        if (dimensionesBackend.length > 0) {
          this.dimensionsArray.clear();

          dimensionesBackend.forEach((dim: any) => {
            const dimGroup = this.createDimensionRow();
            const depthKey = dim.engravingDept_EngravingDepthKey ?? dim.EngravingDepthKey ?? dim.engravingDepthKey;
            const sizeKey = dim.sheetSize_SheetSizeKey ?? dim.SheetSizeKey ?? dim.sheetSizeKey;
            const stock = dim.unitsAvailable ?? dim.UnitsAvailable ?? 0;
            const price = dim.productPrice ?? dim.ProductPrice ?? 0;

            dimGroup.patchValue({
              engravingDepthKey: depthKey !== null && depthKey !== undefined ? Number(depthKey) : null,
              sheetSizeKey: sizeKey !== null && sizeKey !== undefined ? Number(sizeKey) : null,
              productPrice: price !== null && price !== undefined ? Number(price) : null,
              unitsAvailable: stock !== null && stock !== undefined ? Number(stock) : null,
            });

            this.dimensionsArray.push(dimGroup);
          });
        }
      },
      error: (err) => {
        console.error('Error cargando el producto para editar:', err);
        alert('No se pudo cargar la información del producto.');
        this.backToProductList();
      },
    });
  }

  backToProductList(): void {
    this.router.navigate(['/admin/product']);
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

      if (this.productIdToEdit) {
        // MODO EDICIÓN (PUT)
        this.productService.update(this.productIdToEdit, payload).subscribe({
          next: () => {
            this.isSubmitting.set(false);
            alert('¡Producto actualizado con éxito!');
            this.backToProductList();
          },
          error: (err) => {
            this.isSubmitting.set(false);
            alert('Hubo un error al actualizar el producto. Revisa la consola.');
          },
        });
      } else {
        this.productService.createProduct(payload).subscribe({
          next: () => {
            this.isSubmitting.set(false);
            alert('¡Producto creado con éxito!');
            this.backToProductList();
          },
          error: (err) => {
            this.isSubmitting.set(false);
            alert('Hubo un error al crear el producto. Revisa la consola.');
          },
        });
      }
    } else {
      this.productForm.markAllAsTouched();
      alert('Revisa los campos en rojo. Faltan datos requeridos.');
    }
  }
}
