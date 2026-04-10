import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RowmarkApi } from '../../services/rowmark-api/rowmark-api';
import { ProfileLoginDto } from '../../models/dtos/profile-login.dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth-login-form',
  imports: [FormsModule],
  templateUrl: './auth-login-form.component.html',
  styleUrl: './auth-login-form.component.css',
})
export class AuthLoginFormComponent {
  private apiService = inject(RowmarkApi);
  private router = inject(Router);
  public credentials: ProfileLoginDto = {
    email: '',
    password: '',
  };

  onSubmit() {
    this.apiService.login(this.credentials).subscribe({
      next: (token: string) => {
        console.log('¡Login exitoso! Token:', token);
        localStorage.setItem('auth_token', token);
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err: any) => {
        console.error('Falló la autenticación', err);
      },
    });
  }
}
