import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-change-password',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePasswordComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  /* ── Form fields (signals) ─────────────────────────── */
  email = signal('');
  currentPassword = signal('');
  newPassword = signal('');
  confirmNewPassword = signal('');
  showCurrent = signal(false);
  showNew = signal(false);
  showConfirmNew = signal(false);

  /* ── Validation errors ─────────────────────────────── */
  emailError = signal('');
  currentPasswordError = signal('');
  newPasswordError = signal('');
  confirmNewPasswordError = signal('');

  /* ── State ─────────────────────────────────────────── */
  loading = this.authService.loading;
  apiError = signal('');
  apiSuccess = signal('');

  /* ── Validation methods ────────────────────────────── */
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

  private validateCurrentPassword(): boolean {
    const val = this.currentPassword();
    if (!val) {
      this.currentPasswordError.set('Current password is required.');
      return false;
    }
    this.currentPasswordError.set('');
    return true;
  }

  private validateNewPassword(): boolean {
    const val = this.newPassword();
    if (!val) {
      this.newPasswordError.set('New password is required.');
      return false;
    }
    if (val.length < 6) {
      this.newPasswordError.set('New password must be at least 6 characters.');
      return false;
    }
    if (val === this.currentPassword()) {
      this.newPasswordError.set('New password must be different from the current password.');
      return false;
    }
    this.newPasswordError.set('');
    return true;
  }

  private validateConfirmNewPassword(): boolean {
    const val = this.confirmNewPassword();
    if (!val) {
      this.confirmNewPasswordError.set('Please confirm your new password.');
      return false;
    }
    if (val !== this.newPassword()) {
      this.confirmNewPasswordError.set('Passwords do not match.');
      return false;
    }
    this.confirmNewPasswordError.set('');
    return true;
  }

  clearEmailError(): void {
    this.emailError.set('');
    this.apiError.set('');
  }

  clearCurrentPasswordError(): void {
    this.currentPasswordError.set('');
    this.apiError.set('');
  }

  clearNewPasswordError(): void {
    this.newPasswordError.set('');
    this.apiError.set('');
  }

  clearConfirmNewPasswordError(): void {
    this.confirmNewPasswordError.set('');
    this.apiError.set('');
  }

  /* ── Change Password ───────────────────────────────── */
  changePassword(): void {
    this.apiError.set('');
    this.apiSuccess.set('');

    const isEmailValid = this.validateEmail();
    const isCurrentValid = this.validateCurrentPassword();
    const isNewValid = this.validateNewPassword();
    const isConfirmValid = this.validateConfirmNewPassword();

    if (!isEmailValid || !isCurrentValid || !isNewValid || !isConfirmValid) return;

    this.authService
      .changePassword({
        email: this.email().trim(),
        currentPassword: this.currentPassword(),
        newPassword: this.newPassword(),
      })
      .subscribe((res) => {
        if (res.success) {
          this.apiSuccess.set(res.message);
          // Clear form fields
          this.currentPassword.set('');
          this.newPassword.set('');
          this.confirmNewPassword.set('');
          // Redirect to login after a short delay
          setTimeout(() => this.router.navigate(['/login']), 2500);
        } else {
          this.apiError.set(res.message);
        }
      });
  }
}
