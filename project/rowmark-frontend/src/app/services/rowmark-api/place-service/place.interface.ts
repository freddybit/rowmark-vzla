import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Place } from '../../../models/entities/place';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl + 'Place';

  getAll(): Observable<Place[]> {
    return this.http.get<Place[]>(this.apiUrl);
  }

  getById(id: number): Observable<Place> {
    return this.http.get<Place>(`${this.apiUrl}/${id}`);
  }

  create(place: Place): Observable<Place> {
    return this.http.post<Place>(this.apiUrl, place);
  }

  update(id: number, place: Place): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, place);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
