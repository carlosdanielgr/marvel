import { Component, OnInit } from '@angular/core';

import { ProductsService } from 'src/app/domain/products/products.service';
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
  constructor(readonly productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.initData();
  }
}
