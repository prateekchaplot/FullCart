import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private baseService: BaseService, private storageService: StorageService) { }

  login(email: string, password: string): Observable<any> {
    return this.baseService.post('/auth/login', { email, password });
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.baseService.post('/auth/register', { name, email, password });
  }

  decodeToken() {
    let token = this.storageService.getToken();
    if (token) {
      let decodedToken = jwtDecode(token);
      return decodedToken;
    }

    return null;
  }
}
