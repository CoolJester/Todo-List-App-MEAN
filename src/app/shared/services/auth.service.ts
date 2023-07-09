import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    let userData = { email: email, password: password };
    return this.http.post('http://localhost:3000/api/login', userData);
  }

  register(email: String, password: String) {
    let userData = { email: email, password: password };
    return this.http.post('http://localhost:3000/api/register', userData);
  }

  validate(token: String) {
    return this.http.post('http://localhost:3000/api/validate', {
      token: token,
    });
  }
}
