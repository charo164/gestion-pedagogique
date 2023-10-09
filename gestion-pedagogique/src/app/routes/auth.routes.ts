import { Routes } from '@angular/router';
import { authGuard } from '@app/core/guards/auth.guard';
import { AuthLayoutComponent } from '@components/auth-layout/auth-layout.component';

const authRoutes: Routes = [
  {
    path: 'auth',
    canActivate: [authGuard],
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('@modules/auth/auth.module').then((m) => m.AuthModule),
  },
];

export default authRoutes;
