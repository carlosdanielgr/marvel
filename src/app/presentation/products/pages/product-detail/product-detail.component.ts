import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductsService } from 'src/app/domain/products/products.service';
import { Product } from 'src/app/infrastructure/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export default class ProductDetailComponent implements OnInit {
  id = '';

  product: Partial<Product> = {};

  dateInvalid = false;

  constructor(
    private readonly productService: ProductsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (!this.productService.products.length) {
      this.router.navigate(['/products']);
      return;
    }

    this.product = this.productService.products.find(
      (product) => product.id === this.id
    ) as Product;

    this.dateInvalid = !this.isDateValid(String(this.product.modified));
  }

  private isDateValid(date: string) {
    const dateValid = new Date(date);
    return !isNaN(dateValid.getTime());
  }

  addFavorite(): void {}
}
