import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMovie } from 'src/app/interfaces/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent {
  movie!: any;
  isActive: number | string = 1;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(({ id }) => {
      this.movieService.getMovieById(id).subscribe({
        next: (data) => (this.movie = data),
      });
    });
  }

  toggleServer(server: number | string) {
    this.isActive = server;
  }
}
