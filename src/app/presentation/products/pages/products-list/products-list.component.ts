import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { ProductsService } from 'src/app/domain/products/products.service';
import { Favorite, Product } from 'src/app/infrastructure/models/product.model';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductCardComponent, LoadingComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export default class ProductsListComponent implements OnInit {
  products: Product[] = [];

  favorites: Favorite[] = [];

  productFavoritesIds: string[] = [];

  loading = true;

  constructor(private readonly productsService: ProductsService) {}

  ngOnInit(): void {
    this.getJoinComicsFavorites();
  }

  private getJoinComicsFavorites(): void {
    forkJoin([
      this.productsService.getFavorites(),
      this.productsService.getComics(),
    ]).subscribe({
      next: (response: any) => {
        this.favorites = response[0];
        this.productFavoritesIds = this.favorites.map(
          (data: any) => data.productId
        );
        this.setCommics(response[1].data.results);
        this.loading = false;
      },
    });
  }

  private setCommics(results: any[]): void {
    this.products = results.map((data: any) => ({
      id: String(data.id),
      title: data.title,
      description: data.description,
      image: `${data.thumbnail.path}.${data.thumbnail.extension}`,
      isFavorite: this.productFavoritesIds.includes(String(data.id)),
      productId: '',
    }));

    this.products.forEach((product) => {
      if (product.isFavorite) {
        const favorite = this.favorites.find(
          (data) => data.productId === product.id
        );
        product.productId = favorite?.id || '';
      }
    });
  }
}
