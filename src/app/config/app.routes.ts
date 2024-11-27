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
  {
    path: 'products',
    loadComponent: () =>
      import('./../presentation/products/products.component'),
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './../presentation/products/pages/products-list/products-list.component'
          ),
      },
      {
        path: 'favorites',
        loadComponent: () =>
          import(
            './../presentation/products/pages/favorites/favorites.component'
          ),
      },
    ],
  },
];