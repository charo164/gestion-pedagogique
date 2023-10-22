import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AttendanceListService } from '@app/data/services/attendance-list.service';
import {
  SessionCourse,
  SessionCourseService,
} from '@app/data/services/session-course.service';
import { SessionStatus } from '@app/modules/rp/pages/session-course-detail/session-course-detail.component';
import {
  faSearch,
  faAdd,
  faSchoolFlag,
  faHourglass,
  faCircle,
} from '@fortawesome/free-solid-svg-icons';
import { smoothScrollTo } from 'src/utils';

@Component({
  selector: 'app-professor-session-course-detail',
  templateUrl: './professor-session-course-detail.component.html',
  styleUrls: ['./professor-session-course-detail.component.css'],
})
export class ProfessorSessionCourseDetailComponent implements OnInit {
  public sessionCourseId: string | null = null;
  public session: SessionCourse | null = null;
  public status: SessionStatus = {
    message: '',
    type: 'pending',
  };
  public icon = {
    faSearch,
    faAdd,
  };

  public pagination = {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 5,
    loading: false,
  };

  public searchTerm = '';

  public icons = {
    faSchoolFlag,
    faHourglass,
    faCircle,
  };

  constructor(
    public sessionCourseService: SessionCourseService,
    public attendanceListService: AttendanceListService,
    public router: Router
  ) {}

  ngOnInit() {
    smoothScrollTo();
    this.collectRouteParams(this.router);
    this.getSession();
  }

  getSession() {
    this.sessionCourseService
      .getOne(this.sessionCourseId ?? '')
      .subscribe((res) => {
        if ('error' in res) return;

        this.session = res.data;

        this.status = this.getSessionStatusAndMessage();

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

  getSessionStatusAndMessage(): SessionStatus {
    const startDateTime = new Date(this.session?.start_date ?? '');
    const endDateTime = new Date(this.session?.end_date ?? '');
    const currentDateTime = new Date();

    if (currentDateTime < startDateTime && currentDateTime < endDateTime) {
      return {
        // Debut le dd/mm/yyyy a hh:mm
        message: `${startDateTime.toLocaleString()}`,
        type: 'pending',
      };
    } else if (
      currentDateTime > endDateTime &&
      currentDateTime > startDateTime
    ) {
      return {
        message: 'Terminé',
        type: 'completed',
      };
    } else {
      return {
        message: `En cours`,
        type: 'live',
      };
    }
  }

  getPage(page: number) {
    this.pagination.currentPage = page;
  }

  search(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.searchTerm = value;

    if (value === '') this.getPage(1);
  }

  onSearch(e: KeyboardEvent) {
    if (e.key === 'Enter' && this.searchTerm.trim() != '') this.getPage(1);
  }

  cancelSession(canceled: boolean) {
    if (!confirm('Voulez-vous vraiment faire ca?')) return;
    this.sessionCourseService
      .update(this.session?.id.toString() || '', { canceled })
      .subscribe((res) => {
        if ('error' in res) return;

        this.getSession();
      });
  }

  validePresence(id: string, status: boolean = true) {
    if (!confirm('Voulez-vous vraiment faire ca?')) return;
    this.attendanceListService.update(id, { status }).subscribe((res) => {
      if ('error' in res) return;

      this.getSession();
    });
  }
}
