import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  imageUrl: string = '';

  movieForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    year: ['', [Validators.required]],
    categories: ['', [Validators.required]],
    extract: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
    duration: ['', [Validators.required]],
    nation: ['', [Validators.required]],
    episode: ['1', [Validators.required]],
  });

  handleImageUrl(e: any) {
    console.log(e);

    console.log(this.imageUrl);
  }

  constructor(
    private categoryService: CategoryService,
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private route: Router
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
    console.log(this.movieForm);

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
        this.route.navigate(['/admin/movie']);
      });
    } else {
      alert(this.movieForm.status);
    }
  }
}
