import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { StorageService } from '../../shared/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {}

  onRegister() {
    this.authService.register(this.name, this.email, this.password)
    .subscribe(response => {
      const token = response.jwt;
      if (token) {
        this.storageService.setToken(token);
        this.router.navigate(['/']);
      }
    });
  }
}
