import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user';
import { FormData } from '../models/form-dialog-data';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isLoggedIn$ = new BehaviorSubject(false);
  user: User | undefined;

  // toggleDrawer$ = new Subject<{
  //   title: string,
  //   buttonLabel: string,
  //   data: DrawerData[]}>();
}
