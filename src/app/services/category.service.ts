import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  API_URL: string = `http://localhost:3000/category`;

  constructor(private http: HttpClient) {}

  getAllCategory(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.API_URL);
  }
}
