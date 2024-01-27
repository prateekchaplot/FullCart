import { Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { HomeComponent } from './core/home/home.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
      },
      {
          path: 'register',
          component: RegisterComponent
      },
      {
          path: '',
          component: HomeComponent
      }
];
