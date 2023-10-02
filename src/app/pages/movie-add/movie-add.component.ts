import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ICategory } from 'src/app/interfaces/category';
import { IMovie } from 'src/app/interfaces/movie';
import { CategoryService } from 'src/app/services/category.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css'],
})
export class MovieAddComponent {
  categories: ICategory[] = [];
  movie!: IMovie;

  movieForm = this.formBuilder.group({
    title: [
      'Quyến Tư Lượng - The Island of Siliang (2021)',
      [Validators.required],
    ],
    year: ['2023', [Validators.required]],
    categories: ['65111220f22c2c9950f4c4b0', [Validators.required]],
    extract: [
      'Quyến Tư Lượng - The Island of Siliang (2021)',
      [Validators.required],
    ],
    imageUrl: [
      'https://khoaiphim.com/public/upload/cover/cuoc-chien-sinh-ton-7-escape.jpeg',
      [Validators.required],
    ],
    duration: ['12', [Validators.required]],
    nation: ['Việt Nam', [Validators.required]],
    episode: ['1', [Validators.required]],
  });

  constructor(
    private categoryService: CategoryService,
    private movieService: MovieService,
    private formBuilder: FormBuilder
  ) {
    this.categoryService
      .getAllCategory()
      .subscribe((data) => (this.categories = data));
  }

  // title;
  // year;
  // categories;
  // extract;
  // imageUrl;
  // duration;
  // nation;
  // episode;

  onHandleUpdate() {
    // kiểm tra nếu form hợp lệ
    if (this.movieForm.valid) {
      const formData = this.movieForm.value;

      const newMovie = {
        title: formData.title || '',
        year: formData.year,
        categories: [formData.categories],
        extract: formData.extract || '',
        imageUrl: formData.imageUrl || '',
        duration: formData.duration || '',
        nation: formData.nation || '',
        episode: [
          {
            episode: 1,
            type: 'iframe',
            url: '',
          },
        ],
      };

      this.movieService.addMovie(newMovie).subscribe((movie) => {
        alert(movie.message);
      });
    } else {
      alert(this.movieForm.status);
    }
  }
}
