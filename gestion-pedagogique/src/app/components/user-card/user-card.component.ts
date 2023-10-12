import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/data/services/auth.service';
import {
  SchoolYearService,
  SchoolYear,
} from '../../data/services/school-year.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  public schoolYears: SchoolYear[] = [];
  public selectedSchoolYearId: string = '';
  public loadingYear = true;
  constructor(
    public authService: AuthService,
    public schoolYearService: SchoolYearService
  ) {}

  ngOnInit(): void {
    this.getSchoolYears();
  }

  getSchoolYears() {
    this.schoolYearService.getAll().subscribe((res) => {
      if ('error' in res) return console.log(res.error);

      this.schoolYears = res.data;

      const schoolYearId = localStorage.getItem('localSchoolYearId');

      if (!schoolYearId) {
        const active = this.schoolYears.find((s) => s.status);
        if (!active) return;
        localStorage.setItem('localSchoolYearId', active.id.toString());
        this.loadingYear = false;
        this.selectedSchoolYearId = active.id;
        return;
      }

      this.schoolYearService
        .getOne(schoolYearId?.toString() || '')
        .subscribe((res) => {
          this.loadingYear = false;

          if ('error' in res) {
            localStorage.removeItem('localSchoolYearId');
            const active = this.schoolYears.find((s) => s.status);
            if (!active) return;
            localStorage.setItem('localSchoolYearId', active.id.toString());
            this.selectedSchoolYearId = active.id;
            return;
          }

          this.selectedSchoolYearId = res.data.id;
          console.log(this.selectedSchoolYearId)
        });
    });
  }

  onSchoolYearChange(event: Event) {
    const schoolYearId = (event.target as HTMLSelectElement).value;
    this.selectedSchoolYearId = schoolYearId;
    localStorage.setItem('localSchoolYearId', schoolYearId);
    window.location.reload();
  }
}
