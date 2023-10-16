import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchMovie',
})
export class SearchMoviePipe implements PipeTransform {
  transform(movies: any[], searchText: string): any[] {
    if (!movies) return [];
    if (!searchText) return movies;

    searchText = searchText.toLowerCase();

    return movies.filter((movie) => {
      return movie.title.toLowerCase().includes(searchText.toLowerCase());
    });
  }
}
