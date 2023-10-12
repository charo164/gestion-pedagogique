import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  SessionCourse,
  SessionCourseService,
} from '@app/data/services/session-course.service';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { getColor } from 'src/utils/calendar';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { NgSelectOption } from '@app/data/schemas/NgSelect';
import { ClassroomService } from '../../../../data/services/classroom.service';
import { UserService } from '../../../../data/services/user.service';
import { ClasseService } from '../../../../data/services/classe.service';
import { ModuleService } from '../../../../data/services/module.service';
import { smoothScrollTo } from 'src/utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-rp-session-course',
  templateUrl: './rp-session-course.component.html',
  styleUrls: ['./rp-session-course.component.css'],
})
export class RpSessionCourseComponent implements OnInit {
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

  classrooms: NgSelectOption[] = [];
  professors: NgSelectOption[] = [];

  icons = { faCalendarDays };

  constructor(
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
    smoothScrollTo()
    this.getSessionCourses();
    this.getClassroom();
    this.getProfessors();
  }


  getSessionCourses() {
    this.sessionCourseService.getAll().subscribe((res) => {
      if ('error' in res) return console.log(res.error);

      this.sessionCourses = res.data;

      this.createEvents();
    });
  }

  getProfessors() {
    this.userService.getAll({ role: 'professor' }).subscribe((res) => {
      if ('error' in res) return console.log(res.error);

      this.professors = res.data.map((user) => ({
        id: user.id.toString(),
        name: `${user.name}`,
        displayName: `${user.name} ${user.email}`,
      }));
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

  onProfessorChange(id: string) {
    const filtre = !id ? {} : { professor: id };
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
    this.router.navigate(['/rp/session-course/details', event.id]);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
