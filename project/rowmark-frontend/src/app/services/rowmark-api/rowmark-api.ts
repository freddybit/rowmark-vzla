import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RowmarkApi {
  private http = inject(HttpClient);
  private apiUrl = 'https://ve.dolarapi.com/v1/'; // Cambiar esta URL por la del Rowmark API

  getRowmarkData(): any {
    return this.http.get(this.apiUrl + 'rowmark'); // Cambiar 'rowmark' por el endpoint correcto
  }
}
