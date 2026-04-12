import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddProductFormComponent } from "../../shared/add-product-form.component/add-product-form.component";

@Component({
  selector: 'app-add-stock.page',
  imports: [AddProductFormComponent],
  templateUrl: './add-stock.page.html',
  styleUrl: './add-stock.page.css',
})
export class AddStockPage {

}
