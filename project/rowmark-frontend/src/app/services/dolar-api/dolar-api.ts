import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DolarApi {
  private http = inject(HttpClient);
  private apiUrl = 'https://ve.dolarapi.com/v1/';

  getEuroBcv(): Observable<any> {
    return this.http.get(this.apiUrl + 'euros/oficial');
  }
}
