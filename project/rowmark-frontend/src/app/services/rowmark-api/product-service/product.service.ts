import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCard } from '../../../models/entities/productCard';
import { environment } from '../../../../environments/environment';

export interface Product {
  productKey?: number;
  name: string;
  description: string;
  imgUrl: string;
  imgAlt: string;
  videoUrl: string;
  profileKey: number;
}

export interface ProductCreateDto {
  name: string;
  description: string;
  imgUrl: string;
  imgAlt: string;
  videoUrl: string;
  colorKeys: number[];
  materialKeys: number[];
  finishKeys: number[];
  capabilitiesKeys: number[];
  dimensions: any[];
  profileKey: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl + 'Product';

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(dto: ProductCreateDto): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, dto);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getProductCards(): Observable<ProductCard[]> {
    return this.http.get<ProductCard[]>(`${this.apiUrl}/cards`);
  }

  update(id: number, dto: ProductCreateDto): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }
}
