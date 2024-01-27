import { CanActivateFn, Router } from '@angular/router';
import { AppService } from '../../shared/services/app.service';
import { inject } from '@angular/core';

export const AdminGuard: CanActivateFn = (route, state) => {
  const appService = inject(AppService);
  if (appService.user?.role == 'ADMIN') return true;

  const router = inject(Router);
  router.navigate(['/']);
  return false;
};
