import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private baseService: BaseService) { }

  login(email: string, password: string): Observable<any> {
    return this.baseService.post('/auth/login', { email, password });
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.baseService.post('/auth/register', { name, email, password });
  }
}
