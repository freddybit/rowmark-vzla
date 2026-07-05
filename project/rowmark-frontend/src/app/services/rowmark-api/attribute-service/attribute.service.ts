import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttributeService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5008/api/Attribute/';

  getAll(): Observable<Attribute[]> {
    return this.http.get<Attribute[]>(this.apiUrl);
  }

  getById(id: number): Observable<Attribute> {
    return this.http.get<Attribute>(`${this.apiUrl}${id}`);
  }

  create(attribute: Attribute): Observable<Attribute> {
    return this.http.post<Attribute>(this.apiUrl, attribute);
  }

  update(id: number, attribute: Attribute): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}${id}`, attribute);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}

export interface Attribute {
  attributeKey?: number;
  name: string;
  description: string;
  imgUrl: string;
  product?: any[];
}
