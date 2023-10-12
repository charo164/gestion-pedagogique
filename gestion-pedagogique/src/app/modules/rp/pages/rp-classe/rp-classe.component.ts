import { Component, OnInit } from '@angular/core';
import { Classe, ClasseService } from '@app/data/services/classe.service';
import { faSearch, faAdd } from '@fortawesome/free-solid-svg-icons';
import { smoothScrollTo } from 'src/utils';

@Component({
  selector: 'app-rp-classe',
  templateUrl: './rp-classe.component.html',
  styleUrls: ['./rp-classe.component.css'],
})
export class RpClasseComponent implements OnInit {
  public icon = {
    faSearch,
    faAdd,
  };

  public modal = {
    showAddModal: false,
  };

  public classes: Classe[] = [];

  public pagination = {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 5,
    loading: false,
  };

  public searchTerm = '';

  constructor(public classeService: ClasseService) {}

  ngOnInit(): void {
    smoothScrollTo()
    this.classeService
      .getAll({ limit: this.pagination.itemsPerPage })
      .subscribe((res) => {
        if ('error' in res) return console.log(res);

        this.classes = res.data;

        this.pagination.currentPage = res.pagination?.currentPage || 1;
        this.pagination.totalItems = res.pagination?.total || 0;
      });
  }

  getPage(page: number) {
    this.pagination.loading = true;
    this.classeService
      .getAll({
        page: page,
        limit: this.pagination.itemsPerPage,
        name: this.searchTerm,
      })
      .subscribe((res) => {
        if ('error' in res) return;

        this.classes = res.data;
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
