import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { AttacheRoutingModule } from './attache.routes';
import { AttacheSessionCourseComponent } from './pages/attache-session-course/attache-session-course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgxPaginationModule } from 'ngx-pagination';
import { AttacheSessionCourseDetailComponent } from './pages/attache-session-course-detail/attache-session-course-detail.component';

@NgModule({
  declarations: [HomeComponent, AttacheSessionCourseComponent, AttacheSessionCourseDetailComponent],
  imports: [
    CommonModule,
    AttacheRoutingModule,
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
export class AttacheModule {}
