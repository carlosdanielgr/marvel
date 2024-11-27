import { Component, OnInit } from '@angular/core';

import { ProductsService } from 'src/app/domain/products/products.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export default class ProductsListComponent implements OnInit {
  constructor(private readonly productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getComics().subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }
}
