import { Component, OnInit } from '@angular/core';
import {
  Classroom,
  ClassroomService,
} from '@app/data/services/classroom.service';
import { faSearch, faAdd } from '@fortawesome/free-solid-svg-icons';
import { smoothScrollTo } from 'src/utils';

@Component({
  selector: 'app-rp-classroom',
  templateUrl: './rp-classroom.component.html',
  styleUrls: ['./rp-classroom.component.css'],
})
export class RpClassroomComponent implements OnInit {
  public icon = {
    faSearch,
    faAdd,
  };

  public modal = {
    showAddModal: false,
  };

  public classrooms: Classroom[] = [];

  public pagination = {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 5,
    loading: false,
  };

  public searchTerm = '';

  constructor(public classroomService: ClassroomService) {}

  ngOnInit(): void {
    smoothScrollTo()
    this.classroomService.getAll().subscribe((res) => {
      if ('error' in res) return console.log(res);
      this.classrooms = res.data;

      this.pagination.currentPage = res.pagination?.currentPage || 1;
      this.pagination.totalItems = res.pagination?.total || 0;
    });
  }

  getPage(page: number) {
    this.pagination.loading = true;
    this.classroomService
      .getAll({
        page: page,
        limit: this.pagination.itemsPerPage,
        name: this.searchTerm,
      })
      .subscribe((res) => {
        if ('error' in res) return;

        this.classrooms = res.data;
        this.pagination.loading = false;
        this.pagination.currentPage = res.pagination?.currentPage || 1;
        this.pagination.totalItems = res.pagination?.total || 0;
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
