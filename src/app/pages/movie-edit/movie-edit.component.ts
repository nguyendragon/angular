import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ICategory } from 'src/app/interfaces/category';
import { IMovie } from 'src/app/interfaces/movie';
import { CategoryService } from 'src/app/services/category.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css'],
})
export class MovieEditComponent {
  categories: ICategory[] = [];
  movie!: IMovie;
  imageUrl?: string = '';

  movieForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    year: ['', [Validators.required]],
    nation: ['', [Validators.required]],
    categories: ['', [Validators.required]],
    duration: ['', [Validators.required]],
    imageUrl: ['', [Validators.required]],
    extract: ['', [Validators.required]],
  });

  constructor(
    private categoryService: CategoryService,
    private movieService: MovieService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.route.params.subscribe(({ movieId }) => {
      this.movieService.getMovieById(movieId).subscribe({
        next: (movie) => {
          this.movie = movie;

          this.imageUrl = movie.imageUrl;

          this.movieForm.patchValue({
            title: movie.title,
            year: movie.year,
            nation: movie.nation,
            categories: movie.categories[0]._id,
            duration: movie.duration,
            imageUrl: movie.imageUrl,
            extract: movie.extract,
          });
        },
      });
    });

    this.categoryService
      .getAllCategory()
      .subscribe((data) => (this.categories = data));
  }

  onHandleUpdate() {
    // kiểm tra nếu form hợp lệ
    if (this.movieForm.valid) {
      const formData = this.movieForm.value;
      console.log(formData);

      const newMovie: IMovie = {
        _id: this.movie._id,
        title: formData.title || '',
        year: formData.year,
        nation: formData.nation || '',
        categories: [formData.categories],
        duration: formData.duration || '',
        imageUrl: formData.imageUrl || '',
        extract: formData.extract || '',
        episode: this.movie.episode,
      };
      this.movieService.updateMovie(newMovie).subscribe((movie) => {
        alert(movie.message);
      });
    } else {
      alert(this.movieForm.status);
    }
  }
}
