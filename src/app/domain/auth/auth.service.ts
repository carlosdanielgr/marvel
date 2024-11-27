import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '@environment/environtment';
import { Login, Register } from 'src/app/infrastructure/models/auth.model';
import { UserResponse } from 'src/app/infrastructure/models/response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}auth/`;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  register(body: Register) {
    return this.http.post<UserResponse>(`${this.API_URL}register`, body);
  }

  login(body: Login) {
    return this.http.post<UserResponse>(`${this.API_URL}login`, body);
  }

  loginSuccess(data: Pick<UserResponse, 'token' | 'fullName'>) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('fullName', data.fullName);
    this.router.navigate(['/products']);
  }

  logout() {
    this.http.post(`${this.API_URL}logout`, {}).subscribe();
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
  }

  get fullName() {
    return localStorage.getItem('fullName') || '';
  }
}
