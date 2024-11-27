import { Component, OnInit } from '@angular/core';

import { ProductsService } from 'src/app/domain/products/products.service';
import { Product } from 'src/app/infrastructure/models/product.model';
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

  loading = true;

  constructor(private readonly productsService: ProductsService) {}

  ngOnInit(): void {
    this.getCommics();
  }

  private getCommics(): void {
    this.productsService.getComics().subscribe({
      next: (response: any) => {
        this.products = response.data.results.map((data: any) => ({
          id: data.id,
          title: data.title,
          description: data.description,
          image: `${data.thumbnail.path}.${data.thumbnail.extension}`,
        }));
        this.loading = false;
      },
    });
  }
}
