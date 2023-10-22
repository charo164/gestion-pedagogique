import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { NgLibSelectOption } from '@app/data/schemas/NgSelect';
import { User } from '@app/data/schemas/User';
import { RankService } from '@app/data/services/rank.service';
import { SpecializationService } from '@app/data/services/specialization.service';
import { UserService } from '@app/data/services/user.service';
import {
  faSearch,
  faUser,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { smoothScrollTo } from 'src/utils';

@Component({
  selector: 'app-rp-teacher',
  templateUrl: './rp-teacher.component.html',
  styleUrls: ['./rp-teacher.component.css'],
})
export class RpTeacherComponent implements OnInit {
  public icon = {
    faSearch,
    faEnvelope,
    faUser,
  };

  public modal = {
    showAddModal: false,
  };

  public users: User[] = [];

  public ranks: NgLibSelectOption[] = [];
  public specializations: NgLibSelectOption[] = [];

  public pagination = {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 5,
    loading: false,
  };

  public searchTerm = '';

  public createProfessorForm = this.fb.group({
    name: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    specialization: this.fb.control('', [Validators.required]),
    rank: this.fb.control('', [Validators.required]),
    role: this.fb.control('professor', [Validators.required]),
  });

  constructor(
    public userService: UserService,
    public specializationService: SpecializationService,
    public rankService: RankService,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    smoothScrollTo();
    this.userService
      .getAll({
        limit: this.pagination.itemsPerPage,
        role: 'professor',
      })
      .subscribe((res) => {
        if ('error' in res) return;

        this.users = res.data;
      });
    this.specializationService.getAll().subscribe((res) => {
      if ('error' in res) return;

      this.specializations = res.data.map((s) => ({
        id: s.id,
        name: s.name,
        displayName: s.name,
      }));
    });

    this.rankService.getAll().subscribe((res) => {
      if ('error' in res) return;

      this.ranks = res.data.map((r) => ({
        id: r.id,
        name: r.name,
        displayName: r.name,
      }));
    });
  }

  onCreateProfessor() {
    if (this.createProfessorForm.invalid) return;

    this.userService
      .create<User>(this.createProfessorForm.getRawValue())
      .subscribe((res) => {
        if ('error' in res) return;

        this.users.unshift(res.data);
        this.createProfessorForm.reset();
        this.modal.showAddModal = false;
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
