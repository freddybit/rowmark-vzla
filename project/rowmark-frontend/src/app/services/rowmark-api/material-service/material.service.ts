import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Material } from '../../../models/entities/material';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  private http = inject(HttpClient);

  // URL base apuntando a tu controlador de .NET
  private apiUrl = 'http://localhost:5008/api/Material';

  // 1. Obtener todos los materiales (READ ALL)
  getAll(): Observable<Material[]> {
    return this.http.get<Material[]>(this.apiUrl);
  }

  // 2. Obtener un material por ID (READ ONE)
  getById(id: number): Observable<Material> {
    return this.http.get<Material>(`${this.apiUrl}/${id}`);
  }

  // 3. Crear un nuevo material (CREATE)
  create(material: Material): Observable<Material> {
    return this.http.post<Material>(this.apiUrl, material);
  }

  // 4. Actualizar un material existente (UPDATE)
  update(id: number, material: Material): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, material);
  }

  // 5. Eliminar un material (DELETE)
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
