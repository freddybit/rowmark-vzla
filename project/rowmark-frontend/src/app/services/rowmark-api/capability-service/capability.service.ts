
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Capability {
  capabilityKey?: number; // Opcional porque al crear no lo envías
  name: string;
  imgUrl: string;
  description: string;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class CapabilityService {
  private http = inject(HttpClient);

  // URL base apuntando exactamente a tu controlador de .NET
  private apiUrl = 'http://localhost:5008/api/Capability';

  // 1. Obtener todos los registros (READ ALL)
  getAll(): Observable<Capability[]> {
    return this.http.get<Capability[]>(this.apiUrl);
  }

  // 2. Obtener un registro por ID (READ ONE)
  getById(id: number): Observable<Capability> {
    return this.http.get<Capability>(`${this.apiUrl}/${id}`);
  }

  // 3. Crear un nuevo registro (CREATE)
  create(capability: Capability): Observable<Capability> {
    // No envías el ID, la base de datos PostgreSQL lo genera con RETURNING [cite: 84]
    return this.http.post<Capability>(this.apiUrl, capability);
  }

  // 4. Actualizar un registro existente (UPDATE)
  update(id: number, capability: Capability): Observable<void> {
    // Esperamos void porque tu API retorna un 204 No Content [cite: 109]
    return this.http.put<void>(`${this.apiUrl}/${id}`, capability);
  }

  // 5. Eliminar un registro (DELETE)
  delete(id: number): Observable<void> {
    // Esperamos void porque tu API retorna un 204 No Content [cite: 110]
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
