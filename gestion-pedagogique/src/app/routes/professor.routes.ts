import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from '@app/components/dashboard-layout/dashboard-layout.component';
import { authGuard } from '@app/core/guards/auth.guard';

const authRoutes: Routes = [
  {
    path: 'professor',
    canActivate: [authGuard],
    component: DashboardLayoutComponent,
    loadChildren: () =>
      import('@modules/professor/professor.module').then(
        (m) => m.ProfessorModule
      ),
  },
];

export default authRoutes;
