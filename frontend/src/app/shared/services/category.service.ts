import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private baseService: BaseService) { }

  fetchCategories(): Observable<any> {
    return this.baseService.secureGet('/category/getcategories');
  }

  deleteCategory(id: string): Observable<any> {
    return this.baseService.secureDelete(`/category?id=${id}`);
  }

  createCategory(data: any): Observable<any> {
    return this.baseService.securePost('/category', data);
  }

  updateCategory(data: any): Observable<any> {
    return this.baseService.securePut('/category', data);
  }
}
