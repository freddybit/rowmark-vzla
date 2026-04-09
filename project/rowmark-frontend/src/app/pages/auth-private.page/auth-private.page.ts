import { Component } from '@angular/core';
import { AuthLoginFormComponent } from "../../shared/auth-login-form.component/auth-login-form.component";

@Component({
  selector: 'app-auth-private.page',
  imports: [AuthLoginFormComponent],
  templateUrl: './auth-private.page.html',
  styleUrl: './auth-private.page.css',
})
export class AuthPrivatePage {

}
