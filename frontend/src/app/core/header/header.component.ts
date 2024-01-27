import { Component } from '@angular/core';
import { StorageService } from '../../shared/services/storage.service';
import { Router } from '@angular/router';
import { AppService } from '../../shared/services/app.service';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = 'Full Cart';
  isLoggedIn = false;
  isAdmin = false;
  user: User | undefined;

  constructor(private storageService: StorageService, private router: Router, private appService: AppService) {
    this.appService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.user = isLoggedIn ? this.appService.user : undefined;
      this.isAdmin = isLoggedIn && this.user?.role == 'ADMIN';
    });
  }

  onLogout() {
    this.storageService.removeToken();
    this.router.navigate(['/login']);
  }
}
