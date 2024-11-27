import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./../presentation/auth/login/login.component'),
  },
];
