import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private appService: AppService) { }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    this.appService.isLoggedIn$.next(false);
    this.appService.user = undefined;
    localStorage.removeItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.decodeToken();
    this.appService.isLoggedIn$.next(true);
  }

  decodeToken() {
    if (this.appService.user != null) return;
    let token = this.getToken();
    if (token) {
      let decodedToken = jwtDecode(token) as User;
      this.appService.user = {
        name: decodedToken.name,
        email: decodedToken.email,
        role: decodedToken.role
      };
    }
  }
}
