import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProfileLoginDto } from '../../models/dtos/profile-login.dto';

@Injectable({
  providedIn: 'root',
})
export class RowmarkApi {
  private http = inject(HttpClient);
  private apiUrlAuth =
    'https://rowmark-vzla-apargzf7gyggdnc7.centralus-01.azurewebsites.net/api/auth/';

  login(profileLoginDto: ProfileLoginDto): any {
    return this.http.post(this.apiUrlAuth + 'login', profileLoginDto);
  }
}
