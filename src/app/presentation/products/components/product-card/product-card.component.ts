import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ProductsService } from 'src/app/domain/products/products.service';
import { errorFn } from 'src/app/infrastructure/helpers/errors.helper';
import { Product } from 'src/app/infrastructure/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product: Partial<Product> = {};

  constructor(
    private readonly productService: ProductsService,
    private readonly router: Router
  ) {}

  toggleProductFavorite(): void {
    if (this.product.isFavorite) this.removeFavorite();
    else this.setFavorite();
  }

  private removeFavorite(): void {
    this.product.isFavorite = false;
    this.productService
      .deleteFavorite(this.product.productId as string)
      .subscribe({
        next: () => {
          this.productService.setFavorites();
        },
        error: () => {
          this.product.isFavorite = true;
          this.productService.setFavorites();
          Swal.fire(errorFn('Error al quitar de favoritos'));
        },
      });
  }

  private setFavorite(): void {
    this.product.isFavorite = true;
    this.productService.postFavorite(this.product.id as string).subscribe({
      next: (res) => {
        this.product.productId = res.id;
        this.productService.setFavorites();
      },
      error: () => {
        this.product.isFavorite = false;
        Swal.fire(errorFn('Error al agregar a favoritos'));
      },
    });
  }

  onRouteDetails() {
    this.router.navigate([`/products/product-detail/${this.product.id}`]);
  }
}
