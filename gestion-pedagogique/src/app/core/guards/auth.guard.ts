import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/data/services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const authUrl = ['/auth/login'];

  return authService.getLoggedUser().pipe(
    map((user) => {
      if (user) {
        const route = getRoute(user.roles || [], state.url);

        if (state.url === '/auth/logout' || state.url === '/notifications') return true;

        if (authUrl.includes(state.url)) {
          router.navigate([route]);
          return false;
        }

        if (route !== state.url) router.navigate([route]);
        return true;
      }

      if (authUrl.includes(state.url)) return true;

      router.navigate(['/auth/login']);
      return false;
    })
  );
};

function getRoute(roles: string[], url: string) {
  let routes = '/404';

  if (roles.includes('admin')) {
    routes = url.startsWith('/admin') ? url : '/admin';
  }

  if (roles.includes('rp')) {
    routes = url.startsWith('/rp') ? url : '/rp';
  }

  if (roles.includes('professor')) {
    routes = url.startsWith('/professor') ? url : '/professor';
  }

  if (roles.includes('attache')) {
    routes = url.startsWith('/attache') ? url : '/attache';
  }

  return routes;
}
