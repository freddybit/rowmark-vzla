import { inject, Injectable } from '@angular/core';
import { ProfileLoginDto } from '../../../models/dtos/profile-login.dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrlAuth = 'http://localhost:5008/api/auth/';

  login(profileLoginDto: ProfileLoginDto): any {
    return this.http.post(this.apiUrlAuth + 'login', profileLoginDto);
  }
}
