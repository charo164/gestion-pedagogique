import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from '@app/components/dashboard-layout/dashboard-layout.component';
import { RpAddScheduledCourseComponent } from './pages/rp-add-scheduled-course/rp-add-scheduled-course.component';
import { RpAddSessionCourseComponent } from './pages/rp-add-session-course/rp-add-session-course.component';
import { RpClasseComponent } from './pages/rp-classe/rp-classe.component';
import { RpClassroomComponent } from './pages/rp-classroom/rp-classroom.component';
import { RpHomeComponent } from './pages/rp-home/rp-home.component';
import { RpModuleComponent } from './pages/rp-module/rp-module.component';
import { RpScheduledCourseComponent } from './pages/rp-scheduled-course/rp-scheduled-course.component';
import { RpSchoolYearComponent } from './pages/rp-school-year/rp-school-year.component';
import { RpSessionCourseComponent } from './pages/rp-session-course/rp-session-course.component';
import { RpStudentComponent } from './pages/rp-student/rp-student.component';
import { RpTeacherComponent } from './pages/rp-teacher/rp-teacher.component';
import { SessionCourseDetailComponent } from './pages/session-course-detail/session-course-detail.component';
import { RpInscriptionComponent } from './pages/rp-inscription/rp-inscription.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: RpHomeComponent },
      {
        path: 'school-year',
        component: RpSchoolYearComponent,
      },
      {
        path: 'teacher',
        component: RpTeacherComponent,
      },
      {
        path: 'student',
        component: RpStudentComponent,
      },
      {
        path: 'inscription',
        component: RpInscriptionComponent
      },
      {
        path: 'classroom',
        component: RpClassroomComponent,
      },
      {
        path: 'classe',
        component: RpClasseComponent,
      },
      {
        path: 'module',
        component: RpModuleComponent,
      },
      {
        path: 'scheduled-course',
        component: RpScheduledCourseComponent,
        children: [
          {
            path: 'create',
            component: RpAddScheduledCourseComponent,
          },
        ],
      },
      {
        path: 'session-course/details/:id',
        component: SessionCourseDetailComponent,
      },
      {
        path: 'session-course',
        component: RpSessionCourseComponent,
        children: [
          {
            path: 'create',
            component: RpAddSessionCourseComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RpRoutingModule {}
