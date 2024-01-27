import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';
import { inject } from '@angular/core';
import { AppService } from '../../shared/services/app.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);

  if (storageService.getToken() == null) {
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
  
  const appService = inject(AppService);
  storageService.decodeToken();
  appService.isLoggedIn$.next(true);
  return true;
};
