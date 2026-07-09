import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SheetSizeService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl + 'SheetSize/';

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
  sheetSizeKey?: number;
  length: number;
  width: number;
  height: number;
  unitMedition: string;
}
