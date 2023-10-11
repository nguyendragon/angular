import { MovieService } from 'src/app/services/movie.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent {
  searchText: string = '';
  searchResults: any = [];

  constructor(private movieService: MovieService) {}

  handleSearch(event: any): void {
    if (event.key === 'Enter' && this.searchText) {
      const searchText = this.searchText;
      this.movieService
        .searchMovie(searchText)
        .subscribe((data) => (this.searchResults = data));
    }
  }
}
