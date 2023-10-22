import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AttacheSessionCourseComponent } from './pages/attache-session-course/attache-session-course.component';
import { AttacheSessionCourseDetailComponent } from './pages/attache-session-course-detail/attache-session-course-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'session-course',
    component: AttacheSessionCourseComponent,
  },
  {
    path: 'session-course/details/:id',
    component: AttacheSessionCourseDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttacheRoutingModule {}
