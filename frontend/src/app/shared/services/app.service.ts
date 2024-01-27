import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isLoggedIn$ = new BehaviorSubject(false);
  user: User | undefined;
}
