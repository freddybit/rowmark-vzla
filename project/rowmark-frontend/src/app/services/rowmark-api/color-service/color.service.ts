import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../../../models/entities/color';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl + 'Color/';

  getAll(): Observable<Color[]> {
    return this.http.get<Color[]>(this.apiUrl);
  }

  getById(id: number): Observable<Color> {
    return this.http.get<Color>(`${this.apiUrl}${id}`);
  }

  create(color: Color): Observable<Color> {
    return this.http.post<Color>(this.apiUrl, color);
  }

  update(id: number, color: Color): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}${id}`, color);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}
