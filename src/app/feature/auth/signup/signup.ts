import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-signup',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class SignupComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  /* ── Form fields (signals) ─────────────────────────── */
  name = signal('');
  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  /* ── Validation errors ─────────────────────────────── */
  nameError = signal('');
  emailError = signal('');
  passwordError = signal('');
  confirmPasswordError = signal('');

  /* ── State ─────────────────────────────────────────── */
  loading = this.authService.loading;
  apiError = signal('');
  apiSuccess = signal('');

  ngOnInit(): void {
    if (this.authService.checkAuth()) {
      this.router.navigate(['/dashboard']);
    }
  }

  /* ── Validation methods ────────────────────────────── */
  private validateName(): boolean {
    const val = this.name().trim();
    if (!val) {
      this.nameError.set('Full name is required.');
      return false;
    }
    if (val.length < 2) {
      this.nameError.set('Name must be at least 2 characters.');
      return false;
    }
    this.nameError.set('');
    return true;
  }

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

  private validateConfirmPassword(): boolean {
    const val = this.confirmPassword();
    if (!val) {
      this.confirmPasswordError.set('Please confirm your password.');
      return false;
    }
    if (val !== this.password()) {
      this.confirmPasswordError.set('Passwords do not match.');
      return false;
    }
    this.confirmPasswordError.set('');
    return true;
  }

  clearNameError(): void {
    this.nameError.set('');
    this.apiError.set('');
  }

  clearEmailError(): void {
    this.emailError.set('');
    this.apiError.set('');
  }

  clearPasswordError(): void {
    this.passwordError.set('');
    this.apiError.set('');
  }

  clearConfirmPasswordError(): void {
    this.confirmPasswordError.set('');
    this.apiError.set('');
  }

  /* ── Sign Up ───────────────────────────────────────── */
  signUp(): void {
    this.apiError.set('');
    this.apiSuccess.set('');

    const isNameValid = this.validateName();
    const isEmailValid = this.validateEmail();
    const isPasswordValid = this.validatePassword();
    const isConfirmValid = this.validateConfirmPassword();

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmValid) return;

    this.authService
      .signUp({
        name: this.name().trim(),
        email: this.email().trim(),
        password: this.password(),
      })
      .subscribe((res) => {
        if (res.success) {
          this.apiSuccess.set(res.message);
          // Redirect to login after a short delay
          setTimeout(() => this.router.navigate(['/login']), 2500);
        } else {
          this.apiError.set(res.message);
        }
      });
  }
}
