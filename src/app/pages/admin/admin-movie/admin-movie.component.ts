import { Component } from '@angular/core';
import { IMovie } from 'src/app/interfaces/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-admin-movie',
  templateUrl: './admin-movie.component.html',
  styleUrls: ['./admin-movie.component.css'],
})
export class AdminMovieComponent {
  movies: IMovie[] = [];
  isDeleteModal: boolean = true;

  constructor(private movieService: MovieService) {
    this.movieService.getAllMovie().subscribe((data) => (this.movies = data));
  }

  // toggleModal(active: boolean) {
  //   this.isDeleteModal = active;
  // }

  handleDeleteMovie(movieId: number | string, title: string) {
    const confirm = window.confirm('Xác nhận xóa phim: ' + title);
    if (!confirm) return;

    this.movieService.deleteMovieById(movieId).subscribe((data) => {
      this.movies = this.movies.filter((movie) => {
        return movie._id != movieId;
      });
      alert(data.message);
    });
  }
}
