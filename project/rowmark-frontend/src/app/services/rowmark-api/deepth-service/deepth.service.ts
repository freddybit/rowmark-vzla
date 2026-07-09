import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Deepth {
  engravingDepthKey?: number;
  depth: number;
  unitMedition: string;
}

@Injectable({
  providedIn: 'root',
})
export class DeepthService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl + 'EngravingDepth';

  getAll(): Observable<Deepth[]> {
    return this.http.get<Deepth[]>(this.apiUrl);
  }

  getById(id: number): Observable<Deepth> {
    return this.http.get<Deepth>(`${this.apiUrl}/${id}`);
  }

  create(deepth: Deepth): Observable<Deepth> {
    return this.http.post<Deepth>(this.apiUrl, deepth);
  }

  update(id: number, deepth: Deepth): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, deepth);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
