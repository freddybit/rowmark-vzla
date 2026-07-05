import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Finish } from '../../../models/entities/finish';

@Injectable({
  providedIn: 'root',
})
export class FinishService {
  private http = inject(HttpClient);

  // URL base de tu controlador en C#
  private apiUrl = 'http://localhost:5008/api/Finish/';

  getAll(): Observable<Finish[]> {
    return this.http.get<Finish[]>(this.apiUrl);
  }

  getById(id: number): Observable<Finish> {
    return this.http.get<Finish>(`${this.apiUrl}${id}`);
  }

  create(finish: Finish): Observable<Finish> {
    return this.http.post<Finish>(this.apiUrl, finish);
  }

  update(id: number, finish: Finish): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}${id}`, finish);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}
