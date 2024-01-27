import { Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { HomeComponent } from './core/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'inventory',
    loadChildren: () => import('./features/inventory/inventory.module').then(m => m.InventoryModule),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'brand',
    loadChildren: () => import('./features/brand/brand.module').then(m => m.BrandModule),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'category',
    loadChildren: () => import('./features/category/category.module').then(m => m.CategoryModule),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'orders',
    loadChildren: () => import('./features/orders/orders.module').then(m => m.OrdersModule),
    canActivate: [AuthGuard, AdminGuard]
  }
];
