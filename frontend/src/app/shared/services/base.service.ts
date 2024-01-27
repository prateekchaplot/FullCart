import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  baseUrl = 'http://localhost:5221'

  constructor(private http: HttpClient) { }

  post(url: string, body: any): Observable<any> {
    return this.http.post(this.baseUrl + url, body);
  }

  authPost(url: string, body: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.baseUrl + url, body, { headers });
  }

  private getHeaders(): HttpHeaders {
    const token = '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })
  }
}
