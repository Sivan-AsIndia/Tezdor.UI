import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  /* ── Form fields (signals) ─────────────────────────── */
  email = signal('');
  password = signal('');
  rememberMe = signal(false);
  showPassword = signal(false);

  /* ── Validation errors ─────────────────────────────── */
  emailError = signal('');
  passwordError = signal('');

  /* ── State ─────────────────────────────────────────── */
  loading = this.authService.loading;
  apiError = signal('');
  apiSuccess = signal('');

  ngOnInit(): void {
    if (this.authService.checkAuth()) {
      this.router.navigate(['/dashboard']);
    }
  }

  /* ── Validation ────────────────────────────────────── */
  private validateEmail(): boolean {
    const val = this.email().trim();
    if (!val) {
      this.emailError.set('Email is required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      this.emailError.set('Please enter a valid email address.');
      return false;
    }
    this.emailError.set('');
    return true;
  }

  private validatePassword(): boolean {
    const val = this.password();
    if (!val) {
      this.passwordError.set('Password is required.');
      return false;
    }
    if (val.length < 6) {
      this.passwordError.set('Password must be at least 6 characters.');
      return false;
    }
    this.passwordError.set('');
    return true;
  }

  clearEmailError(): void {
    this.emailError.set('');
    this.apiError.set('');
  }

  clearPasswordError(): void {
    this.passwordError.set('');
    this.apiError.set('');
  }

  /* ── Sign In ───────────────────────────────────────── */
  login(): void {
    this.apiError.set('');
    this.apiSuccess.set('');

    const isEmailValid = this.validateEmail();
    const isPasswordValid = this.validatePassword();

    if (!isEmailValid || !isPasswordValid) return;

    this.authService
      .signIn({
        email: this.email().trim(),
        password: this.password(),
        rememberMe: this.rememberMe(),
      })
      .subscribe((res) => {
        if (res.success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.apiError.set(res.message);
        }
      });
  }
}
