import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  API_URL: string = `http://localhost:3000/movie`;

  constructor(private http: HttpClient) {}

  getAllMovie(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(this.API_URL);
  }

  getMovieById(id: string | number): Observable<IMovie> {
    return this.http.get<IMovie>(this.API_URL + `/${id}`);
  }

  updateMovie(movie: IMovie): Observable<any> {
    return this.http.put<any>(this.API_URL, movie);
  }

  addMovie(movie: any): Observable<any> {
    return this.http.post<any>(this.API_URL, movie);
  }

  deleteMovieById(id: string | number): Observable<any> {
    return this.http.delete<any>(this.API_URL + `/${id}`);
  }
}
