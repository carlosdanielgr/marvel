import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from 'src/app/domain/auth/auth.service';
import { errorFn } from 'src/app/infrastructure/helpers/errors.helper';
import { Register } from 'src/app/infrastructure/models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export default class RegisterComponent implements OnInit {
  form!: FormGroup<Record<keyof Register, FormControl>>;

  loading = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      identification: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onRegister(): void {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.authService.register(this.form.value as Register).subscribe({
      next: ({ token, fullName }) => {
        this.authService.loginSuccess({ token, fullName });
      },
      error: (error) => {
        Swal.fire(errorFn(error.error.message));
      },
    });
  }
}
