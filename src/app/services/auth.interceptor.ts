import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // ถ้ามี Token ให้ Clone Request แล้วแนบ Header เข้าไป
  if (token) {
    const tokenautoload = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(tokenautoload);
  }

  return next(req);
};