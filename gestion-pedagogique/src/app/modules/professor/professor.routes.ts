import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfessorScheduledCourseComponent } from './pages/professor-scheduled-course/professor-scheduled-course.component';
import { ProfessorSessionCourseComponent } from './pages/professor-session-course/professor-session-course.component';
import { ProfessorSessionCourseDetailComponent } from './pages/professor-session-course-detail/professor-session-course-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'scheduled-course',
    component: ProfessorScheduledCourseComponent,
  },
  {
    path: 'session-course',
    component: ProfessorSessionCourseComponent,
  },
  {
    path: 'session-course/details/:id',
    component: ProfessorSessionCourseDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfessorRoutingModule {}
