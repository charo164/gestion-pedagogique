import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  ScheduledCourse,
  ScheduledCourseService,
} from '@app/data/services/scheduled-course.service';
import {
  faAdd,
  faHourglass,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { smoothScrollTo } from 'src/utils';
import { AuthService } from '../../../../data/services/auth.service';

@Component({
  selector: 'app-professor-scheduled-course',
  templateUrl: './professor-scheduled-course.component.html',
  styleUrls: ['./professor-scheduled-course.component.css'],
})
export class ProfessorScheduledCourseComponent implements OnInit {
  public icon = {
    faSearch,
    faAdd,
    faHourglass,
  };

  public scheduledCourses: ScheduledCourse[] = [];

  public pagination = {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 5,
    loading: false,
  };

  public searchTerm = '';

  constructor(
    public authService: AuthService,
    public scheduledCourseService: ScheduledCourseService,
    private router: Router
  ) {
    router.events.subscribe((val) => {
      const extras = this.router.getCurrentNavigation()?.extras.state;

      if (!extras) return;

      if (!(val instanceof NavigationEnd) || !extras['scheduledCourse']) return;

      this.scheduledCourses.unshift(extras['scheduledCourse']);
    });
  }

  ngOnInit(): void {
    smoothScrollTo();
    this.getScheduledCourses();
  }

  getScheduledCourses() {
    this.scheduledCourseService
      .getAll({
        limit: this.pagination.itemsPerPage,
        professor: this.authService.user?.id || 0,
      })
      .subscribe((res) => {
        if ('error' in res) return;

        this.scheduledCourses = res.data;
        this.pagination.currentPage = res.pagination?.currentPage || 1;
        this.pagination.totalItems = res.pagination?.total || 0;
      });
  }

  getPage(page: number, filter: any = {}) {
    this.pagination.loading = true;
    this.scheduledCourseService
      .getAll({
        page: page,
        limit: this.pagination.itemsPerPage,
        q: this.searchTerm,
        ...filter,
      })
      .subscribe((years) => {
        if ('error' in years) return;

        this.scheduledCourses = years.data;
        this.pagination.loading = false;
        this.pagination.currentPage = years.pagination?.currentPage || 1;
        this.pagination.totalItems = years.pagination?.total || 0;
        this.pagination.loading = false;
      });
  }

  search(e: Event) {
    const value = (e.target as HTMLInputElement).value;
    this.searchTerm = value;

    if (value === '') this.getPage(1);
  }

  onSearch(e: KeyboardEvent) {
    if (e.key === 'Enter' && this.searchTerm.trim() != '') this.getPage(1);
  }
}
