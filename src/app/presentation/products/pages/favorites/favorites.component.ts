import { Component, OnInit } from '@angular/core';

import { ProductsService } from 'src/app/domain/products/products.service';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [ProductCardComponent, LoadingComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export default class FavoritesComponent implements OnInit {
  constructor(readonly productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.initData();
  }
}
