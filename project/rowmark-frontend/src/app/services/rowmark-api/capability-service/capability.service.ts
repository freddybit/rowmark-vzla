
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Capability {
  capabilityKey?: number;
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

  private apiUrl = environment.apiUrl + 'Capability';

  getAll(): Observable<Capability[]> {
    return this.http.get<Capability[]>(this.apiUrl);
  }

  getById(id: number): Observable<Capability> {
    return this.http.get<Capability>(`${this.apiUrl}/${id}`);
  }

  create(capability: Capability): Observable<Capability> {
    return this.http.post<Capability>(this.apiUrl, capability);
  }

  update(id: number, capability: Capability): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, capability);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
