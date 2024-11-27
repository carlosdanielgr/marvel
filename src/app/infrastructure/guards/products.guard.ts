import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export function productsGuard(): CanActivateFn {
  return () => {
    const router: Router = inject(Router);
    const token = localStorage.getItem('token');
    if (token) return true;
    return router.navigate(['']);
  };
}
