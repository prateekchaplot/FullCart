import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isLoggedIn$ = new BehaviorSubject(false);
  user: any = null;
}
