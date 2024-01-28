import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  baseUrl = 'http://localhost:5221/api'

  constructor(private http: HttpClient, private storageService: StorageService) { }

  post(url: string, body: any): Observable<any> {
    return this.http.post(this.baseUrl + url, body);
  }

  secureGet(url: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.baseUrl + url, { headers });
  }

  securePost(url: string, body: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.baseUrl + url, body, { headers });
  }

  secureDelete(url: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(this.baseUrl + url, { headers });
  }

  private getHeaders(): HttpHeaders {
    const token = this.storageService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })
  }
}
