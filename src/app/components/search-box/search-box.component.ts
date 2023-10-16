import { MovieService } from 'src/app/services/movie.service';
import { Component } from '@angular/core';
import { IMovie } from 'src/app/interfaces/movie';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent {
  searchTerm: string = '';
  searchResults: any = [];
  debounceTimeout: any = '';

  constructor(private movieService: MovieService) {}

  onInput(event: Event) {
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      const searchTerm = (event.target as HTMLInputElement).value;
      this.handleSearch(searchTerm);
    }, 300);
  }

  handleSearch(searchTerm: string) {
    if (searchTerm) {
      const searchTerm = this.searchTerm;
      this.movieService.searchMovie(searchTerm).subscribe((data: any) => {
        if (data && data.movies) {
          this.searchResults = data.movies;
        } else {
          this.searchResults = [];
        }
      });
    } else {
      this.searchResults = [];
    }
  }

  clearSearchResult() {
    this.searchTerm = '';
    this.searchResults = [];
  }

  // handleSearch(event: any): void {
  //   if (event.key === 'Enter' && this.searchTerm) {
  //     const searchTerm = this.searchTerm;
  //     this.movieService.searchMovie(searchTerm).subscribe((data: any) => {
  //       if (data && data.movies) {
  //         this.searchResults = data.movies;
  //       } else {
  //         this.searchResults = [];
  //       }
  //     });
  //   } else {
  //     this.searchResults = [];
  //   }
  // }
}
