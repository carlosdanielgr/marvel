import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environment/environtment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
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
}
