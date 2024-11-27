import { Component, Input } from '@angular/core';

import { ProductsService } from 'src/app/domain/products/products.service';
import { errorFn } from 'src/app/infrastructure/helpers/errors.helper';
import { Product } from 'src/app/infrastructure/models/product.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product: Partial<Product> = {};

  constructor(private readonly productService: ProductsService) {}

  toggleProductFavorite(): void {
    if (this.product.isFavorite) this.removeFavorite();
    else this.setFavorite();
  }

  private removeFavorite(): void {
    this.product.isFavorite = false;
    this.productService
      .deleteFavorite(this.product.productId as string)
      .subscribe({
        error: () => {
          this.product.isFavorite = true;
          Swal.fire(errorFn('Error al quitar de favoritos'));
        },
      });
  }

  private setFavorite(): void {
    this.product.isFavorite = true;
    this.productService.postFavorite(this.product.id as string).subscribe({
      next: (res) => {
        this.product.productId = res.id;
      },
      error: () => {
        this.product.isFavorite = false;
        Swal.fire(errorFn('Error al agregar a favoritos'));
      },
    });
  }
}
