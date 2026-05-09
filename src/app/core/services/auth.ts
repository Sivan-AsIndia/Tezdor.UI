import { Injectable, computed, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, of } from 'rxjs';
import {
  AuthResponse,
  SignUpRequest,
  SignInRequest,
  ChangePasswordRequest,
  UserInfo,
} from '../models/auth';

const API_BASE = '/api/auth';
 

const TOKEN_KEY = 'tezdor_token';
const USER_KEY = 'tezdor_user';
const REMEMBER_KEY = 'tezdor_remember';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  /* ── Signals ───────────────────────────────────────────────── */
  private readonly _currentUser = signal<UserInfo | null>(this.loadStoredUser());
  private readonly _token = signal<string | null>(this.loadStoredToken());
  private readonly _loading = signal(false);

  readonly currentUser = this._currentUser.asReadonly();
  readonly token = this._token.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly isLoggedIn = computed(() => !!this._token() && !!this._currentUser());

  /* ── Sign Up ───────────────────────────────────────────────── */
  signUp(request: SignUpRequest): Observable<AuthResponse> {
    this._loading.set(true);
    return this.http.post<AuthResponse>(`${API_BASE}/signup`, request).pipe(
      tap(() => this._loading.set(false)),
      catchError((err) => {
        this._loading.set(false);
        const msg = err.error?.message ?? 'Sign up failed. Please try again.';
        return of({ success: false, message: msg } as AuthResponse);
      })
    );
  }

  /* ── Sign In ───────────────────────────────────────────────── */
  signIn(request: SignInRequest): Observable<AuthResponse> {
    this._loading.set(true);
    return this.http.post<AuthResponse>(`${API_BASE}/signin`, request).pipe(
      tap((res) => {
        this._loading.set(false);
        if (res.success && res.token && res.user) {
          this.storeSession(res.token, res.user, request.rememberMe);
        }
      }),
      catchError((err) => {
        this._loading.set(false);
        const msg = err.error?.message ?? 'Sign in failed. Please try again.';
        return of({ success: false, message: msg } as AuthResponse);
      })
    );
  }

  /* ── Change Password ───────────────────────────────────────── */
  changePassword(request: ChangePasswordRequest): Observable<AuthResponse> {
    this._loading.set(true);
    return this.http
      .post<AuthResponse>(`${API_BASE}/change-password`, request)
      .pipe(
        tap(() => this._loading.set(false)),
        catchError((err) => {
          this._loading.set(false);
          const msg =
            err.error?.message ?? 'Password change failed. Please try again.';
          return of({ success: false, message: msg } as AuthResponse);
        })
      );
  }

  /* ── Logout ────────────────────────────────────────────────── */
  logout(): void {
    const token = this._token();
    if (token) {
      this.http
        .post<AuthResponse>(`${API_BASE}/logout?token=${token}`, {})
        .subscribe();
    }
    this.clearSession();
    this.router.navigate(['/login']);
  }

  /* ── Storage helpers ───────────────────────────────────────── */
  private storeSession(
    token: string,
    user: UserInfo,
    rememberMe: boolean
  ): void {
    const storage = rememberMe ? localStorage : sessionStorage;

    // Clear both storages first
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(REMEMBER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);

    storage.setItem(TOKEN_KEY, token);
    storage.setItem(USER_KEY, JSON.stringify(user));
    if (rememberMe) {
      localStorage.setItem(REMEMBER_KEY, 'true');
    }

    // Keep backward-compatible 'login' flag for the auth guard
    localStorage.setItem('login', 'true');

    this._token.set(token);
    this._currentUser.set(user);
  }

  private clearSession(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(REMEMBER_KEY);
    localStorage.removeItem('login');
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);

    this._token.set(null);
    this._currentUser.set(null);
  }

  private loadStoredToken(): string | null {
    return (
      localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY)
    );
  }

  private loadStoredUser(): UserInfo | null {
    const raw =
      localStorage.getItem(USER_KEY) ?? sessionStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as UserInfo;
    } catch {
      return null;
    }
  }

  /** Called from the auth guard to check if session is valid */
  checkAuth(): boolean {
    return !!this.loadStoredToken() && !!this.loadStoredUser();
  }
}
