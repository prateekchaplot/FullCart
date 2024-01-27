import { Component } from '@angular/core';
import { AppService } from '../../shared/services/app.service';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user: User | undefined;

  constructor(private appService: AppService) {
    this.appService.isLoggedIn$.subscribe(isLoggedIn => {
      this.user = isLoggedIn ? this.appService.user : undefined;
    });
  }
}
