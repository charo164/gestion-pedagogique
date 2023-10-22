import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgLibSelectOption } from '@app/data/schemas/NgSelect';
import { ClasseService } from '@app/data/services/classe.service';
import {
  InscriptionService,
  Student,
} from '@app/data/services/inscription.service';
import { faAdd, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { smoothScrollTo } from 'src/utils';
import { csvToJson } from 'src/utils/string';

@Component({
  selector: 'app-rp-inscription',
  templateUrl: './rp-inscription.component.html',
  styleUrls: ['./rp-inscription.component.css'],
})
export class RpInscriptionComponent {
  public icon = {
    faSearch,
    faAdd,
  };

  public inscriptionForm = this.fb.group({
    classe_id: this.fb.control('', [Validators.required]),
    students: this.fb.control<any[] | null>(null, [Validators.required]),
  });

  public modal = {
    showAddModal: false,
  };

  public users: (Student & { classe: string })[] = [];
  public classes: NgLibSelectOption[] = [];

  public pagination = {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 5,
    loading: false,
  };

  public searchTerm = '';

  constructor(
    public inscriptionService: InscriptionService,
    public classeService: ClasseService,
    public fb: FormBuilder,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    smoothScrollTo();
    this.inscriptionService
      .getAll({
        limit: this.pagination.itemsPerPage,
      })
      .subscribe((res) => {
        if ('error' in res) return;

        if (!Array.isArray(res.data)) return;

        this.users = res.data.map((inscription) => ({
          ...inscription.student,
          classe: inscription.classe.name,
        }));
        this.pagination.currentPage = res.pagination?.currentPage || 1;
        this.pagination.totalItems = res.pagination?.total || 0;
        console.log(this.pagination)
      });

    this.classeService.getAll().subscribe((res) => {
      if ('error' in res) return;

      this.classes = res.data.map((classe) => ({
        id: classe.id.toString(),
        name: classe.name,
        displayName: `${classe.name} - ${classe.field_of_study} - ${classe.school_year}`,
      }));
    });
  }

  getPage(page: number) {
    this.pagination.currentPage = page;
    this.inscriptionService
      .getAll({
        limit: this.pagination.itemsPerPage,
        page: this.pagination.currentPage,
        q: this.searchTerm,
      })
      .subscribe((res) => {
        if ('error' in res) return;

        this.users = res.data.map((inscription) => ({
          ...inscription.student,
          classe: inscription.classe.name,
        }));
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

  onRegistreStudents() {
    this.inscriptionService
      .create<any>(this.inscriptionForm.getRawValue())
      .subscribe((res) => {
        if ('error' in res) return;
        this.toast.info(
          `Operation terminé avec ${res?.data?.success?.length} success et ${res.data.errors.length} erreurs!`
        );
        const newLocal = this;
        newLocal.inscriptionForm.reset();
        this.modal.showAddModal = false;
        this.ngOnInit();
      });
  }

  onFileChange(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    if (!files || !files[0]) return;
    const file = files[0];

    if (file.type !== 'text/csv') return;

    const reader = new FileReader();

    reader.onload = (e) => {
      console.log(e);
      const content = e.target?.result as string;
      const data = csvToJson(content);

      if (data.length === 0) {
        return this.toast.error('Invalid file', 'Error');
      }

      return this.inscriptionForm.patchValue({
        students: data,
      });
    };

    reader.readAsText(file);
  }
}
