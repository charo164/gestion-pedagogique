import { Component, OnInit } from '@angular/core';
import { User } from '@app/data/schemas/User';
import { UserService } from '@app/data/services/user.service';
import { faSearch, faAdd } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rp-teacher',
  templateUrl: './rp-teacher.component.html',
  styleUrls: ['./rp-teacher.component.css'],
})
export class RpTeacherComponent implements OnInit {
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
    this.userService
      .getAll({
        limit: this.pagination.itemsPerPage,
        role: 'professor',
      })
      .subscribe((res) => {
        if ('error' in res) return;

        this.users = res.data;
      });
  }

  getPage(page: number) {
    this.pagination.currentPage = page;
    this.userService
      .getAll({
        limit: this.pagination.itemsPerPage,
        page: this.pagination.currentPage,
        role: 'professor',
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
