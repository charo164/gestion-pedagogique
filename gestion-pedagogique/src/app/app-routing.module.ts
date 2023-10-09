import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import authRoutes from './routes/auth.routes';
import rpRoutes from './routes/rp.routes';
import { Page404Component } from './components/page404/page404.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  ...authRoutes,
  ...rpRoutes,
  { path: '**', component: Page404Component, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
