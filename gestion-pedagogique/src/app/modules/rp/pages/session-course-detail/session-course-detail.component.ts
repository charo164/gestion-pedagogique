import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import {
  SessionCourse,
  SessionCourseService,
} from '@app/data/services/session-course.service';
import {
  faSchoolFlag,
  faHourglass,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-session-course-detail',
  templateUrl: './session-course-detail.component.html',
  styleUrls: ['./session-course-detail.component.css'],
})
export class SessionCourseDetailComponent implements OnInit {
  public sessionCourseId: string | null = null;
  public session: SessionCourse | null = null;
  public status: { message: string; type: 'pending' | 'live' | 'completed' } = {
    message: '',
    type: 'pending',
  };

  public icons = {
    faSchoolFlag,
    faHourglass,
    faCircle,
  };

  constructor(
    public sessionCourseService: SessionCourseService,
    public router: Router
  ) {}

  ngOnInit() {
    this.collectRouteParams(this.router);
    this.getSession();
  }

  getSession() {
    this.sessionCourseService
      .getOne(this.sessionCourseId ?? '')
      .subscribe((res) => {
        if ('error' in res) return;

        this.session = res.data;

        const startDateTime = new Date(this.session.start_date);
        const endDateTime = new Date(this.session.end_date);
        const currentDateTime = new Date();

        if (currentDateTime < startDateTime && currentDateTime < endDateTime) {
          this.status.message = 'Debut le ' + startDateTime.toLocaleString();
          this.status.type = 'pending';
        } else if (
          currentDateTime > endDateTime &&
          currentDateTime > startDateTime
        ) {
          this.status.message = 'Terminé le ' + endDateTime.toLocaleString();
          this.status.type = 'completed';
        } else {
          this.status.message = `En cours`;
          this.status.type = 'live';
        }

        console.log(this.session);
      });
  }

  collectRouteParams(router: Router) {
    let params: any = {};
    let stack: ActivatedRouteSnapshot[] = [router.routerState.snapshot.root];

    while (stack.length > 0) {
      const route = stack.pop()!;
      params = { ...params, ...route.params };
      stack.push(...route.children);
    }

    this.sessionCourseId = params['id'] ?? null;
  }
}
