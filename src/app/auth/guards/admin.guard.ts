import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { adminUID } from '../constants';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const currentUserUID = authService.returnCurrentUserUID();
  if (currentUserUID === adminUID) {
    return true;
  } else {
    return router.createUrlTree(['/auth']);
  }
};
