import { Routes } from '@angular/router';
import { authGuard } from '@app/core/guards/auth.guard';

const rpRoute: Routes = [
  {
    path: 'rp',
    canActivate: [authGuard],
    loadChildren: () => import('@modules/rp/rp.module').then((m) => m.RpModule),
  },
];

export default rpRoute;
