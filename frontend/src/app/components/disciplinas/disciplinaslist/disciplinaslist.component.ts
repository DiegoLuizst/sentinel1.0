import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import Swal from 'sweetalert2';
import { Disciplina } from '../../../models/disciplina';
import { DisciplinaService } from '../../../services/disciplina.service';
import { UsuariosService } from '../../../services/usuarios.service';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-disciplinaslist',
  standalone: true,
  imports: [CommonModule, AgGridModule, MdbRippleModule, RouterLink],
  templateUrl: './disciplinaslist.component.html',
  styleUrl: './disciplinaslist.component.css'
})
export class DisciplinaslistComponent {

  private gridApi!: GridApi<Disciplina>;
  public gridOptions: GridOptions<Disciplina> = {
    pagination: true,
    paginationPageSize: 20,
    theme: 'legacy',
    localeText: {
      page: 'Página',
      to: 'até',
      of: 'de',
      more: 'mais',
      next: 'Próxima',
      last: 'Última',
      first: 'Primeira',
      previous: 'Anterior',
      loadingOoo: 'Carregando...',
      noRowsToShow: 'Nenhum registro encontrado'
    },
    domLayout: 'autoHeight'
  };

  colDefs: ColDef<Disciplina>[] = [
    { field: 'id', headerName: 'ID', filter: 'agNumberColumnFilter', floatingFilter: true },
    { field: 'nome', headerName: 'Nome', filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'carga_horaria', headerName: 'Carga Horária', filter: 'agTextColumnFilter', floatingFilter: true },
    {
      headerName: 'Ações',
      cellRenderer: (params: any) => {
        const disciplina = params.data;
        const editBtn = this.canEdit ?
          `<button type="button" class="btn btn-warning btn-rounded btn-sm btn-icon" data-action="edit" data-id="${disciplina.id}">
            <i class="fas fa-edit"></i>
          </button>` : '';
        const delBtn = this.canDelete ?
          `<button type="button" class="btn btn-danger btn-rounded btn-sm btn-icon" data-action="delete" data-id="${disciplina.id}">
            <i class="fas fa-trash-alt"></i>
          </button>` : '';
        return `
          <button type="button" class="btn btn-info btn-rounded btn-sm btn-icon" data-action="view" data-id="${disciplina.id}">
            <i class="fas fa-eye"></i>
          </button>
          ${editBtn}
          ${delBtn}
        `;
      },
      sortable: false,
      filter: false,
      cellClass: ['no-padding']
    }
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1
  };

  rowData: Disciplina[] = [];
  disciplinaService = inject(DisciplinaService);
  router = inject(Router);
  usuariosService = inject(UsuariosService);

  get canAdd() { return this.usuariosService.hasPermission('/disciplinas','POST'); }
  get canEdit() { return this.usuariosService.hasPermission('/disciplinas','PUT'); }
  get canDelete() { return this.usuariosService.hasPermission('/disciplinas','DELETE'); }

  constructor() {
    this.findAll();
  }

  private clickListener = (event: Event) => {
    const target = event.target as HTMLElement;
    const button = target.closest('button[data-action]');
    if (button) {
      const action = button.getAttribute('data-action');
      const id = button.getAttribute('data-id');
      if (action === 'edit') {
        this.router.navigate(['/admin/disciplinas/edit', id]);
      } else if (action === 'view') {
        this.viewById(Number(id));
      } else if (action === 'delete') {
        this.deleteById(Number(id));
      }
    }
  };

  ngAfterViewInit() {
    document.addEventListener('click', this.clickListener);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.clickListener);
  }

  findAll() {
    this.disciplinaService.findAll().subscribe({
      next: lista => { this.rowData = lista; },
      error: () => {
        Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
      }
    });
  }

  onGridReady(params: GridReadyEvent<Disciplina>) {
    this.gridApi = params.api;
    setTimeout(() => { params.api.sizeColumnsToFit(); }, 50);
  }

  viewById(id: number) {
    const disciplina = this.rowData.find(c => c.id === id);
    if (disciplina) {
      Swal.fire({
        title: 'Disciplina',
        html: `<p><strong>Nome:</strong> ${disciplina.nome}</p><p><strong>Carga Horária:</strong> ${disciplina.carga_horaria}</p>`,
        icon: 'info'
      });
    }
  }

  deleteById(id: number) {
    Swal.fire({
      title: 'Confirma exclusão de registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        this.disciplinaService.delete(id).subscribe({
          next: () => {
            Swal.fire({ title: 'Disciplina Excluída com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
            this.findAll();
          },
          error: () => {
            Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
          }
        });
      }
    });
  }
}
