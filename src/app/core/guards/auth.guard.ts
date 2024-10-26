import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (state.url === '/login' && token) {
    // Redirige a /main si intenta acceder a /login con token
    return router.parseUrl('/main');
  } else if (!token && state.url.startsWith('/main')) {
    // Redirige a /login si intenta acceder a /main sin token
    return router.parseUrl('/login');
  }
  // Permitir la navegación si no se cumplen las condiciones anteriores
  return true;
};
