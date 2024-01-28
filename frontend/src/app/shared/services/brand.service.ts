import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private baseService: BaseService) { }

  fetchBrands(): Observable<any> {
    return this.baseService.secureGet('/brand/getbrands');
  }

  deleteBrand(id: string): Observable<any> {
    return this.baseService.secureDelete(`/brand?id=${id}`);
  }
}
