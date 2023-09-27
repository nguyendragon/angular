import { Component } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  searchText: string = '';
  currentProduct!: IProduct;
  movies: IProduct[] = [];

  constructor(private productService: ProductService) {
    this.productService.getMovies().subscribe({
      next: (data) => (this.movies = data),
      error: (error) => console.log(error),
    });
  }

  removeProduct(id: number | string) {
    const confirm = window.confirm('Are you fucking sure?');
    if (confirm) {
      this.productService.removeItem(id).subscribe(() => {
        this.movies = this.movies.filter((item) => item._id !== id);
      });
    }
  }
  showProduct(product: IProduct) {
    this.currentProduct = product;
  }
}

// ng g s services/product
// b1: import HttpClientModule vao file app.module.ts
// b2: inject service HttpClient vao product.service.ts
// b3: su dung service
