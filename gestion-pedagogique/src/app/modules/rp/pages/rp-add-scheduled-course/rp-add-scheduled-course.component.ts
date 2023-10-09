import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectOption } from '@app/data/schemas/NgSelect';
import { ClasseService } from '@app/data/services/classe.service';
import { ModuleService } from '@app/data/services/module.service';
import { ScheduledCourseService } from '@app/data/services/scheduled-course.service';
import { UserService } from '@app/data/services/user.service';
import {
  faAdd,
  faHourglass,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rp-add-scheduled-course',
  templateUrl: './rp-add-scheduled-course.component.html',
  styleUrls: ['./rp-add-scheduled-course.component.css'],
})
export class RpAddScheduledCourseComponent implements OnInit {
  public icon = {
    faSearch,
    faAdd,
    faHourglass,
  };

  public createScheduledCourseForm = this.fb.group({
    total_hours: ['', [Validators.required, Validators.min(1)]],
    type: ['', [Validators.required]],
    user_id: [null, [Validators.required]],
    classe_id: [null, [Validators.required]],
    module_id: [null, [Validators.required]],
  });

  public professors: NgSelectOption[] = [];
  public modules: NgSelectOption[] = [];
  public classes: NgSelectOption[] = [];

  constructor(
    public scheduledCourseService: ScheduledCourseService,
    public userService: UserService,
    public moduleService: ModuleService,
    public classeService: ClasseService,
    private router: Router,
    private fb: FormBuilder,
    private toast: ToastrService
  ) {
    console.log('sdsd');
  }

  ngOnInit(): void {
    this.userService.getAll({ role: 'professor' }).subscribe((res) => {
      if ('error' in res) return;

      this.professors = res.data.map((user) => ({
        id: user.id.toString(),
        name: user.name,
        displayName: `${user.name} - ${user.email}`,
      }));
    });

    this.moduleService.getAll({}).subscribe((res) => {
      if ('error' in res) return;

      this.modules = res.data.map((module) => ({
        id: module.id.toString(),
        name: module.name,
        displayName: `${module.name}`,
      }));
    });

    this.classeService.getAll({}).subscribe((res) => {
      if ('error' in res) return;

      this.classes = res.data.map((classe) => ({
        id: classe.id.toString(),
        name: classe.name,
        displayName: `${classe.name} - ${classe.field_of_study} - ${classe.school_year}`,
      }));
    });
  }

  onCreateScheduledCourse() {
    this.scheduledCourseService
      .create(this.createScheduledCourseForm.getRawValue() as any)
      .subscribe((res) => {
        if ('error' in res) {
          this.toast.error('Ce cours existe déjà probablement 🤥');
          return;
        }

        this.createScheduledCourseForm.patchValue({
          total_hours: '',
          type: '',
          user_id: null,
          classe_id: null,
          module_id: null,
        });

        this.router.navigate(['/rp/scheduled-course'], {
          state: { scheduledCourse: res.data },
        });
      });
  }

  goBack() {
    this.router.navigate(['/rp/scheduled-course']);
  }
}
