import { Component, OnInit } from '@angular/core';
import {
  SchoolYear,
  SchoolYearService,
} from '@app/data/services/school-year.service';
import {
  faAdd,
  faRemove,
  faSearch,
  faToggleOff,
  faToggleOn,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';

@Component({
  selector: 'app-rp-school-year',
  templateUrl: './rp-school-year.component.html',
  styleUrls: ['./rp-school-year.component.css'],
})
export class RpSchoolYearComponent implements OnInit {
  public icon = {
    faRemove,
    faToggleOff,
    faToggleOn,
    faSearch,
    faAdd,
  };
  public year = '';
  public years: SchoolYear[] = [];
  public modal = {
    showAddModal: false,
  };

  public pagination = {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 5,
    loading: false,
  };

  public searchTerm = '';

  constructor(
    public schoolYearService: SchoolYearService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.schoolYearService
      .getAll({ limit: this.pagination.itemsPerPage })
      .subscribe((res) => {
        if ('error' in res) return;

        this.years = res.data;
        this.pagination.currentPage = res.pagination?.currentPage || 1;
        this.pagination.totalItems = res.pagination?.total || 0;
      });
  }

  getPage(page: number) {
    this.pagination.loading = true;
    this.schoolYearService
      .getAll({
        page: page,
        limit: this.pagination.itemsPerPage,
        name: this.searchTerm,
      })
      .subscribe((years) => {
        if ('error' in years) return;

        this.years = years.data;
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

  addSchoolYear() {
    if (this.year === '') return alert('Please enter a year');

    this.schoolYearService.create({ name: this.year }).subscribe((res) => {
      if ('error' in res) {
        this.toast.error(res.message);
        return;
      }

      this.years.unshift(res.data);
      this.year = '';
      this.modal.showAddModal = false;
    });
  }

  deleteSchoolYear(id: string) {
    const confirm = window.confirm('Are you sure you want to delete this?');

    if (!confirm) return;

    this.schoolYearService.delete(id).subscribe((res) => {
      if ('error' in res) {
        this.toast.error(res.message);
        return;
      }

      this.years = this.years.filter((year) => year.id !== id);
    });
  }

  toggleActive(id: string, isActive: boolean) {
    this.schoolYearService
      .update(id, { status: !isActive })
      .subscribe((res) => {
        if ('error' in res) {
          this.toast.error(res.message);
          return;
        }

        this.years = this.years.map((year) => {
          if (year.id === id) return res.data;

          if (year.status) return { ...year, status: false };

          return year;
        });
      });
  }
}
