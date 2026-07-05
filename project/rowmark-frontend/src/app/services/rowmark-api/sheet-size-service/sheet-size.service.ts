import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SheetSizeService {
  private http = inject(HttpClient);

  // Asegúrate de que el controlador en .NET se llame SheetSizeController
  private apiUrl = 'http://localhost:5008/api/SheetSize/';

  getAll(): Observable<SheetSize[]> {
    return this.http.get<SheetSize[]>(this.apiUrl);
  }

  getById(id: number): Observable<SheetSize> {
    return this.http.get<SheetSize>(`${this.apiUrl}${id}`);
  }

  create(sheetSize: SheetSize): Observable<SheetSize> {
    return this.http.post<SheetSize>(this.apiUrl, sheetSize);
  }

  update(id: number, sheetSize: SheetSize): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}${id}`, sheetSize);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}

export interface SheetSize {
  sheetSizeKey?: number; // Opcional porque la BD lo genera
  length: number;
  width: number;
  height: number;
  unitMedition: string; // Respetamos la 'u' minúscula que le pusiste en C#
}
