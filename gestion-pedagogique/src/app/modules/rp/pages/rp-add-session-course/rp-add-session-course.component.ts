import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectOption } from '@app/data/schemas/NgSelect';
import { ClasseService } from '@app/data/services/classe.service';
import { ModuleService } from '@app/data/services/module.service';
import {
  ScheduledCourse,
  ScheduledCourseService,
} from '@app/data/services/scheduled-course.service';
import { UserService } from '@app/data/services/user.service';
import {
  faSearch,
  faAdd,
  faHourglass,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { ClassroomService } from '../../../../data/services/classroom.service';
import { SessionCourseService } from '../../../../data/services/session-course.service';

@Component({
  selector: 'app-rp-add-session-course',
  templateUrl: './rp-add-session-course.component.html',
  styleUrls: ['./rp-add-session-course.component.css'],
})
export class RpAddSessionCourseComponent implements OnInit {
  public icon = {
    faSearch,
    faAdd,
    faHourglass,
  };

  public createSessionCourseForm = this.fb.group({
    start_date: ['', [Validators.required]],
    end_date: ['', [Validators.required]],
    classroom_id: [null, [Validators.required]],
    scheduled_course_id: [null, [Validators.required]],
  });

  public classrooms: NgSelectOption[] = [];
  public scheduledCourses: NgSelectOption[] = [];
  public selectedCourse: ScheduledCourse | null = null;

  constructor(
    public scheduledCourseService: ScheduledCourseService,
    public classroomService: ClassroomService,
    public sessionCourseService: SessionCourseService,
    private router: Router,
    private fb: FormBuilder,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.scheduledCourseService.getAll({}).subscribe((res) => {
      if ('error' in res) return;

      this.scheduledCourses = res.data.map((scheduledCourse) => ({
        id: scheduledCourse.id.toString(),
        name: `${scheduledCourse.classe} ${scheduledCourse.user} ${scheduledCourse.module}`,
        displayName: `${scheduledCourse.module} - ${scheduledCourse.user} - ${scheduledCourse.classe} - ${scheduledCourse.scheduled_hours}h/${scheduledCourse.total_hours}h`,
      }));
    });

    this.classroomService.getAll({}).subscribe((res) => {
      if ('error' in res) return;

      this.classrooms = res.data.map((classroom) => ({
        id: classroom.id.toString(),
        name: classroom.name,
        displayName: classroom.name,
      }));
    });
  }

  onCreateSessionCourse() {
    const data = this.createSessionCourseForm.getRawValue();
    const startDate = new Date(data.start_date || '');
    const endDate = new Date(data.end_date || '');

    if (!this.isValidateDates(startDate, endDate)) return;

    data.start_date = startDate.toISOString().slice(0, 19).replace('T', ' ');
    data.end_date = endDate.toISOString().slice(0, 19).replace('T', ' ');

    this.sessionCourseService.create(data as any).subscribe((res) => {
      if ('error' in res) {
        this.toast.error(res.message);
        return;
      }

      this.createSessionCourseForm.patchValue({
        start_date: '',
        end_date: '',
        classroom_id: null,
        scheduled_course_id: null,
      });

      this.router.navigate(['/rp/session-course'], {
        state: { sessionCourse: res.data },
      });
    });
  }

  goBack() {
    this.router.navigate(['/rp/session-course']);
  }

  isValidateDates(startDate: Date, endDate: Date) {
    if (startDate.getTime() > endDate.getTime()) {
      this.toast.error('La date de début doit être avant la date de fin');
      return false;
    }

    const duration = Math.abs(endDate.getTime() - startDate.getTime());

    if (duration > 1000 * 60 * 60 * 4) {
      this.toast.error('La durée de la session ne doit pas dépasser 4 heures');
      return false;
    }

    if (duration < 1000 * 60 * 60 * 1) {
      this.toast.error('La durée de la session doit être au moins 1 heure');
      return false;
    }

    return true;
  }
}
