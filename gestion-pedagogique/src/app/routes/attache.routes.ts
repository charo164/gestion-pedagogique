import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from '@app/components/dashboard-layout/dashboard-layout.component';
import { authGuard } from '@app/core/guards/auth.guard';

const authRoutes: Routes = [
  {
    path: 'attache',
    canActivate: [authGuard],
    component: DashboardLayoutComponent,
    loadChildren: () =>
      import('@modules/attache/attache.module').then((m) => m.AttacheModule),
  },
];

export default authRoutes;
