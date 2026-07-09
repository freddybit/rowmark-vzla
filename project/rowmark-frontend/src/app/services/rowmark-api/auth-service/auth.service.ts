import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileLoginDto } from '../../../models/dtos/profile-login.dto';
import { ProfileRegisterDto } from '../../../models/dtos/profile-register.dto';
import { ReadProfileDTO } from '../../../models/dtos/read-profile.dto';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl + 'Auth';

  // --- AUTENTICACIÓN Y REGISTRO ---

  login(profileLoginDto: ProfileLoginDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, profileLoginDto);
  }

  register(profileRegisterDto: ProfileRegisterDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, profileRegisterDto);
  }

  // --- CRUD PERFILES ---

  getAllProfiles(): Observable<ReadProfileDTO[]> {
    return this.http.get<ReadProfileDTO[]>(this.apiUrl);
  }

  getProfileById(id: number): Observable<ReadProfileDTO> {
    return this.http.get<ReadProfileDTO>(`${this.apiUrl}/${id}`);
  }

  updateProfile(id: number, profileUpdateDto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, profileUpdateDto);
  }

  deleteProfile(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getMyProfile(): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get(`${this.apiUrl}/me`, { headers });
  }
}
