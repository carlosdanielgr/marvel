import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environment/environtment';
import { Favorite, Product } from 'src/app/infrastructure/models/product.model';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Product[] = [];

  favorites: Product[] = [];

  loading = false;

  private productFavoritesIds: string[] = [];

  private readonly API_URL = `${environment.apiUrl}products/`;

  constructor(private readonly http: HttpClient) {}

  getComics() {
    return this.http.get(`${this.API_URL}comics`);
  }

  getFavorites() {
    return this.http.get(`${this.API_URL}favorites`);
  }

  postFavorite(productId: string) {
    return this.http.post<{ id: string }>(`${this.API_URL}add-favorite`, {
      productId,
    });
  }

  deleteFavorite(productId: string) {
    return this.http.delete(`${this.API_URL}remove-favorite/${productId}`);
  }

  initData() {
    if (this.products.length) return;
    this.loading = true;
    forkJoin([this.getFavorites(), this.getComics()]).subscribe({
      next: (response: any) => {
        const favorite = response[0] as Favorite[];
        this.productFavoritesIds = favorite.map((data: any) => data.productId);
        this.setCommics(response[1].data.results);
        this.setFavorites();
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

  setFavorites(): void {
    this.favorites = this.products.filter((product) => product.isFavorite);
  }
}
