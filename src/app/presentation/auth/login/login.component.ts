import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from 'src/app/domain/auth/auth.service';
import { errorFn } from 'src/app/infrastructure/helpers/errors.helper';
import { Login } from 'src/app/infrastructure/models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  form = new FormGroup<Record<keyof Login, FormControl>>({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', Validators.required),
  });

  loading = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  onLogin() {
    this.loading = true;
    this.authService.login(this.form.value as Login).subscribe({
      next: ({ token, fullName }) => {
        this.authService.loginSuccess({ token, fullName });
      },
      error: (error) => {
        Swal.fire(errorFn(error.error.message));
      },
    });
  }
}
