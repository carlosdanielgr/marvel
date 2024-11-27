import { Component, Input } from '@angular/core';

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
}
