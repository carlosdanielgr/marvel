import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from 'src/app/domain/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  fullName = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.fullName = authService.fullName;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
