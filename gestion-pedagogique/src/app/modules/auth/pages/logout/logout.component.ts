import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../../data/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  icons = {
    faSpinner,
  };
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.logout();
  }

  logout() {
    this.authService.logout().subscribe(() => {
      localStorage.clear();
      this.router.navigate(['/auth/login']);
    });
  }
}
