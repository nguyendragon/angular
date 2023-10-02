import { Component, Input } from '@angular/core';
import { IMovie } from 'src/app/interfaces/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent {
  @Input() title: string = '';
  movies: IMovie[] = [];

  constructor(private movieService: MovieService) {
    this.movieService.getAllMovie().subscribe((data) => (this.movies = data));
  }
}
