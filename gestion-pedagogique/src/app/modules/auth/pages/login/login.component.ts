import { Component } from '@angular/core';
import { AuthService } from '@app/data/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  onSubmit() {
    this.authService
      .login(
        this.loginForm.getRawValue() as { email: string; password: string }
      )
      .pipe(
        catchError(({ error }) => {
          this.toast.error(error.error.message, 'Authentification error');
          return of(null);
        })
      )
      .subscribe((user) => {
        if (!user) return;

        this.router.navigate(['/']);
      });
  }
}
