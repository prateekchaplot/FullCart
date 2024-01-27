import { Component } from '@angular/core';
import { StorageService } from '../../shared/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = 'Full Cart';

  constructor(private storageService: StorageService, private router: Router) {}

  onLogout() {
    this.storageService.removeToken();
    this.router.navigate(['/login']);
  }
}
