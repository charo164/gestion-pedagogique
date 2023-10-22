import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ProfessorRoutingModule } from './professor.routes';
import { ProfessorSessionCourseComponent } from './pages/professor-session-course/professor-session-course.component';
import { ProfessorScheduledCourseComponent } from './pages/professor-scheduled-course/professor-scheduled-course.component';
import { ProfessorSessionCourseDetailComponent } from './pages/professor-session-course-detail/professor-session-course-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    HomeComponent,
    ProfessorSessionCourseComponent,
    ProfessorScheduledCourseComponent,
    ProfessorSessionCourseDetailComponent
  ],
  imports: [
    CommonModule,
    ProfessorRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgSelectModule,
    NgxPaginationModule,
  ]
})
export class ProfessorModule { }
