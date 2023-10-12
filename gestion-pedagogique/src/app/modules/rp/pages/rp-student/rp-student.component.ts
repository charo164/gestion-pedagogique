import { Component } from '@angular/core';
import { User } from '@app/data/schemas/User';
import { UserService } from '@app/data/services/user.service';
import { faAdd, faSearch } from '@fortawesome/free-solid-svg-icons';
import { smoothScrollTo } from 'src/utils';

@Component({
  selector: 'app-rp-student',
  templateUrl: './rp-student.component.html',
  styleUrls: ['./rp-student.component.css'],
})
export class RpStudentComponent {
  public icon = {
    faSearch,
    faAdd,
  };

  public modal = {
    showAddModal: false,
  };

  public users: User[] = [];

  public pagination = {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 5,
    loading: false,
  };

  public searchTerm = '';

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    smoothScrollTo();
    this.userService
      .getAll({
        limit: this.pagination.itemsPerPage,
        role: 'student',
      })
      .subscribe((res) => {
        if ('error' in res) return;

        this.users = res.data;

        this.pagination.currentPage = res.pagination?.currentPage || 1;
        this.pagination.totalItems = res.pagination?.total ?? 0;
      });
  }

  getPage(page: number) {
    this.pagination.currentPage = page;
    this.userService
      .getAll({
        limit: this.pagination.itemsPerPage,
        page: this.pagination.currentPage,
        role: 'student',
        name: this.searchTerm,
      })
      .subscribe((res) => {
        if ('error' in res) return;

        this.users = res.data;
        this.pagination.currentPage = res.pagination?.currentPage || 1;
        this.pagination.totalItems = res.pagination?.total || 0;
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
