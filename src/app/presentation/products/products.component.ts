import { Component } from '@angular/core';

import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export default class ProductsComponent {}
