import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../../../models/entities/color';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private http = inject(HttpClient);

  // URL base de tu controlador en C# (ajusta el puerto si es necesario)
  private apiUrl = 'http://localhost:5008/api/Color/';

  /**
   * Obtiene todos los colores registrados
   */
  getAll(): Observable<Color[]> {
    return this.http.get<Color[]>(this.apiUrl);
  }

  /**
   * Obtiene un color específico por su ID
   */
  getById(id: number): Observable<Color> {
    console.log(`Obteniendo color con ID: ${id}`);
    return this.http.get<Color>(`${this.apiUrl}${id}`);
  }

  /**
   * Crea un nuevo color en la base de datos
   */
  create(color: Color): Observable<Color> {
    // Recuerda que el ID lo debe generar la base de datos (Supabase) automáticamente
    return this.http.post<Color>(this.apiUrl, color);
  }

  /**
   * Actualiza un color existente
   */
  update(id: number, color: Color): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}${id}`, color);
  }

  /**
   * Elimina un color por su ID
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}
