import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileLoginDto } from '../../../models/dtos/profile-login.dto';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/rowmark-api/auth-service/auth.service';

@Component({
  selector: 'app-auth-login-form',
  imports: [FormsModule],
  templateUrl: './auth-login-form.component.html',
  styleUrl: './auth-login-form.component.css',
})
export class AuthLoginFormComponent {
  private apiService = inject(AuthService);
  private router = inject(Router);
  public credentials: ProfileLoginDto = {
    email: '',
    password: '',
  };

  onSubmit() {
    this.apiService.login(this.credentials).subscribe({
      next: (response: any) => {
        const token = response.token;
        localStorage.setItem('auth_token', token);
        this.apiService.getMyProfile().subscribe({
          next: (userData) => {
            localStorage.setItem('currentUser', JSON.stringify(userData));
            this.router.navigate(['/admin/my-profile']);
          },
          error: (err) => {
            console.error('Error al cargar perfil:', err);
          },
        });
      },
      error: (err) => {
        console.error('Falló el login', err);
      },
    });
  }
}
