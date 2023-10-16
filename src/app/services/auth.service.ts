import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL: string = `http://localhost:3000/auth`;
  constructor(private http: HttpClient) {}

  signIn(data: any): Observable<any> {
    return this.http.post(this.API_URL + '/signin', data);
  }

  signUp(data: any): Observable<any> {
    return this.http.post(this.API_URL + '/signup', data);
  }

  isAuthenticated(): any {
    return JSON.parse(localStorage.getItem('userInfo') ?? '{}');
  }
}
