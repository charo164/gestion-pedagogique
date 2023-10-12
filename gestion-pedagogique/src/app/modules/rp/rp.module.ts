import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RpClasseComponent } from './pages/rp-classe/rp-classe.component';
import { RpClassroomComponent } from './pages/rp-classroom/rp-classroom.component';
import { RpHomeComponent } from './pages/rp-home/rp-home.component';
import { RpModuleComponent } from './pages/rp-module/rp-module.component';
import { RpScheduledCourseComponent } from './pages/rp-scheduled-course/rp-scheduled-course.component';
import { RpSchoolYearComponent } from './pages/rp-school-year/rp-school-year.component';
import { RpSessionCourseComponent } from './pages/rp-session-course/rp-session-course.component';
import { RpTeacherComponent } from './pages/rp-teacher/rp-teacher.component';
import { RpRoutingModule } from './rp.routes';
//import { FlatpickrModule } from 'angularx-flatpickr';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgxPaginationModule } from 'ngx-pagination';
import { RpAddScheduledCourseComponent } from './pages/rp-add-scheduled-course/rp-add-scheduled-course.component';
import { RpAddSessionCourseComponent } from './pages/rp-add-session-course/rp-add-session-course.component';
import { SessionCourseDetailComponent } from './pages/session-course-detail/session-course-detail.component';
import { RpStudentComponent } from './pages/rp-student/rp-student.component';
import { RpInscriptionComponent } from './pages/rp-inscription/rp-inscription.component';

@NgModule({
  declarations: [
    RpHomeComponent,
    RpSchoolYearComponent,
    RpTeacherComponent,
    RpClassroomComponent,
    RpClasseComponent,
    RpModuleComponent,
    RpScheduledCourseComponent,
    RpSessionCourseComponent,
    RpAddScheduledCourseComponent,
    RpAddSessionCourseComponent,
    SessionCourseDetailComponent,
    RpStudentComponent,
    RpInscriptionComponent
  ],
  imports: [
    CommonModule,
    RpRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgSelectModule,
    NgxPaginationModule,
  ],
})
export class RpModule {}
