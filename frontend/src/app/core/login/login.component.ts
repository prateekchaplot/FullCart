import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { StorageService } from '../../shared/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private authSerivce: AuthService,
    private storageService: StorageService,
    private router: Router) {}

  onLogin() {
    this.authSerivce.login(this.email, this.password)
    .subscribe(response => {
      const token = response.jwt;
      if (token) {
        this.storageService.setToken(token);
        this.router.navigate(['/']);
      }
    });
  }
}
