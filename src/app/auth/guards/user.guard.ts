import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { userUID } from '../constants';

export const userGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const currentUserUID = authService.returnCurrentUserUID();
  if (currentUserUID === userUID) {
    return true;
  } else {
    return router.createUrlTree(['/auth']);
  }
};
