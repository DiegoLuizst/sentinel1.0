import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import Swal from 'sweetalert2';
import { Professor } from '../../../models/professor';
import { ProfessorService } from '../../../services/professor.service';
import { UsuariosService } from '../../../services/usuarios.service';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-professoreslist',
  standalone: true,
  imports: [CommonModule, AgGridModule, MdbRippleModule, RouterLink],
  templateUrl: './professoreslist.component.html',
  styleUrl: './professoreslist.component.css'
})
export class ProfessoreslistComponent {

  private gridApi!: GridApi<Professor>;
  public gridOptions: GridOptions<Professor> = {
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

  colDefs: ColDef<Professor>[] = [
    { field: 'id', headerName: 'ID', filter: 'agNumberColumnFilter', floatingFilter: true },
    { headerName: 'Funcionário', valueGetter: p => p.data?.funcionario?.nome, filter: 'agTextColumnFilter', floatingFilter: true },
    { headerName: 'Usuário', valueGetter: p => p.data?.usuario?.email, filter: 'agTextColumnFilter', floatingFilter: true },
    {
      headerName: 'Ações',
      cellRenderer: (params: any) => {
        const prof = params.data;
        const editBtn = this.canEdit ?
          `<button type="button" class="btn btn-warning btn-rounded btn-sm btn-icon" data-action="edit" data-id="${prof.id}">
            <i class="fas fa-edit"></i>
          </button>` : '';
        const delBtn = this.canDelete ?
          `<button type="button" class="btn btn-danger btn-rounded btn-sm btn-icon" data-action="delete" data-id="${prof.id}">
            <i class="fas fa-trash-alt"></i>
          </button>` : '';
        return `
          <button type="button" class="btn btn-info btn-rounded btn-sm btn-icon" data-action="view" data-id="${prof.id}">
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

  rowData: Professor[] = [];
  professorService = inject(ProfessorService);
  router = inject(Router);
  usuariosService = inject(UsuariosService);

  get canAdd() { return this.usuariosService.hasPermission('/professores','POST'); }
  get canEdit() { return this.usuariosService.hasPermission('/professores','PUT'); }
  get canDelete() { return this.usuariosService.hasPermission('/professores','DELETE'); }

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
        this.router.navigate(['/admin/professores/edit', id]);
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
    this.professorService.findAll().subscribe({
      next: lista => { this.rowData = lista; },
      error: () => {
        Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
      }
    });
  }

  onGridReady(params: GridReadyEvent<Professor>) {
    this.gridApi = params.api;
    setTimeout(() => { params.api.sizeColumnsToFit(); }, 50);
  }

  viewById(id: number) {
    const professor = this.rowData.find(c => c.id === id);
    if (professor) {
      const turmas = professor.turmas.map(t => t.nome).join(', ');
      const disciplinas = professor.disciplinas.map(d => d.nome).join(', ');
      Swal.fire({
        title: 'Professor',
        html: `<p><strong>Funcionário:</strong> ${professor.funcionario?.nome || ''}</p>` +
              `<p><strong>Usuário:</strong> ${professor.usuario?.email || ''}</p>` +
              `<p><strong>Turmas:</strong> ${turmas}</p>` +
              `<p><strong>Disciplinas:</strong> ${disciplinas}</p>`,
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
        this.professorService.delete(id).subscribe({
          next: () => {
            Swal.fire({ title: 'Registro excluído com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
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
