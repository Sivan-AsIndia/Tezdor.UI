import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // If unauthorized and not already on auth pages, redirect to login
        const url = router.url;
        if (!url.includes('/login') && !url.includes('/signup') && !url.includes('/change-password')) {
          localStorage.removeItem('login');
          localStorage.removeItem('tezdor_token');
          localStorage.removeItem('tezdor_user');
          sessionStorage.removeItem('tezdor_token');
          sessionStorage.removeItem('tezdor_user');
          router.navigate(['/login']);
        }
      }
      return throwError(() => error);
    })
  );
};
