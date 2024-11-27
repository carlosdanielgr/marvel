import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./../presentation/auth/login/login.component'),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./../presentation/auth/register/register.component'),
  },
];
