import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environment/environtment';
import { Login, Register } from 'src/app/infrastructure/models/auth.model';
import { UserResponse } from 'src/app/infrastructure/models/response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}auth/`;

  constructor(private readonly http: HttpClient) {}

  register(body: Register) {
    return this.http.post<UserResponse>(`${this.API_URL}register`, body);
  }

  login(body: Login) {
    return this.http.post<UserResponse>(`${this.API_URL}login`, body);
  }

  logout() {
    return this.http.post(`${this.API_URL}logout`, {});
  }
}
