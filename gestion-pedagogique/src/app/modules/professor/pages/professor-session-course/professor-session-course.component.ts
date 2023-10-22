import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgLibSelectOption } from '@app/data/schemas/NgSelect';
import { ClasseService } from '@app/data/services/classe.service';
import { ClassroomService } from '@app/data/services/classroom.service';
import { ModuleService } from '@app/data/services/module.service';
import {
  SessionCourse,
  SessionCourseService,
} from '@app/data/services/session-course.service';
import { UserService } from '@app/data/services/user.service';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { CalendarView } from 'angular-calendar';
import { CalendarEvent } from 'calendar-utils';
import { isSameMonth, isSameDay } from 'date-fns';
import { Subject } from 'rxjs';
import { smoothScrollTo } from 'src/utils';
import { getColor } from 'src/utils/calendar';
import { AuthService } from '../../../../data/services/auth.service';

@Component({
  selector: 'app-professor-session-course',
  templateUrl: './professor-session-course.component.html',
  styleUrls: ['./professor-session-course.component.css'],
})
export class ProfessorSessionCourseComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent:
    | TemplateRef<any>
    | undefined;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  sessionCourses: SessionCourse[] = [];

  activeDayIsOpen: boolean = false;

  classrooms: NgLibSelectOption[] = [];

  icons = { faCalendarDays };

  constructor(
    public authService: AuthService,
    public sessionCourseService: SessionCourseService,
    public classroomService: ClassroomService,
    public userService: UserService,
    public classeService: ClasseService,
    public moduleService: ModuleService,
    public router: Router
  ) {
    router.events.subscribe((val) => {
      const extras = this.router.getCurrentNavigation()?.extras.state;

      if (!extras) return;

      if (!(val instanceof NavigationEnd) || !extras['sessionCourse']) return;

      this.sessionCourses.unshift(extras['sessionCourse']);

      this.createEvents();
    });
  }

  ngOnInit(): void {
    smoothScrollTo();
    this.getSessionCourses();
    this.getClassroom();
  }

  getSessionCourses() {
    const user = this.authService?.user;
    this.sessionCourseService
      .getAll({ professor:  user?.id || '' })
      .subscribe((res) => {
        if ('error' in res) return console.log(res.error);

        this.sessionCourses = res.data;

        this.createEvents();
      });
  }

  getClassroom() {
    this.classroomService.getAll().subscribe((res) => {
      if ('error' in res) return console.log(res.error);

      this.classrooms = res.data.map((classe) => ({
        id: classe.id.toString(),
        name: `${classe.name}`,
        displayName: `${classe.name}`,
      }));
    });
  }

  onClassroomChange(id: string) {
    const filtre = !id ? {} : { classroom: id };
    this.sessionCourseService.getAll(filtre as any).subscribe((res) => {
      if ('error' in res) return console.log(res.error);

      this.sessionCourses = res.data;

      this.createEvents();
    });
  }
  createEvents() {
    this.events = this.sessionCourses.map((session) => ({
      start: new Date(session.start_date),
      end: new Date(session.end_date),
      title: `${session.scheduled_course.classe} (${session.scheduled_course.module}) avec ${session.scheduled_course.user} (${session.classroom})`,
      color: getColor(
        session.canceled,
        new Date(session.start_date),
        new Date(session.end_date)
      ),
      id: session.id,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: false,
    }));

    this.refresh.next();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (!isSameMonth(date, this.viewDate)) return;

    this.activeDayIsOpen = !(
      (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
      events.length === 0
    );

    this.viewDate = date;
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.router.navigate(['/professor/session-course/details', event.id]);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
