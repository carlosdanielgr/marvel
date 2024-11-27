import { Routes } from '@angular/router';

import { productsGuard } from '../infrastructure/guards/products.guard';

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
    canActivate: [productsGuard()],
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
      {
        path: 'product-detail/:id',
        loadComponent: () =>
          import(
            './../presentation/products/pages/product-detail/product-detail.component'
          ),
      },
    ],
  },
];
