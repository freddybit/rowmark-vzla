import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Interfaz que mapea exactamente las propiedades de tu backend en C#
export interface Material {
  materialKey?: number; // Opcional porque la base de datos lo genera en el POST
  name: string;
  imgUrl: string;
  category: string;
  description: string;
}

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
    // Retorna el material creado junto con su nuevo materialKey generado por Supabase
    return this.http.post<Material>(this.apiUrl, material);
  }

  // 4. Actualizar un material existente (UPDATE)
  update(id: number, material: Material): Observable<void> {
    // Retorna void porque la API envía un 204 No Content al ser exitoso
    return this.http.put<void>(`${this.apiUrl}/${id}`, material);
  }

  // 5. Eliminar un material (DELETE)
  delete(id: number): Observable<void> {
    // Retorna void porque la API envía un 204 No Content al ser exitoso
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
