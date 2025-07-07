import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { Aluno } from '../../../models/aluno';
import { AlunosService } from '../../../services/alunos.service';
import { UsuariosService } from '../../../services/usuarios.service';
import Swal from 'sweetalert2';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-alunoslist',
  standalone: true,
  imports: [CommonModule, AgGridModule, MdbRippleModule, RouterLink],
  templateUrl: './alunoslist.component.html',
  styleUrl: './alunoslist.component.css'
})
export class AlunoslistComponent {

  private gridApi!: GridApi<Aluno>;
  public gridOptions: GridOptions<Aluno> = {
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

  colDefs: ColDef<Aluno>[] = [
    { field: 'nome', headerName: 'Nome', filter: 'agTextColumnFilter', floatingFilter: true },
    {
      field: 'data',
      headerName: 'Data de Nascimento',
      filter: 'agDateColumnFilter',
      floatingFilter: true,
      valueFormatter: params => {
        if (!params.value) {
          return '';
        }
        const date = new Date(params.value);
        return date.toLocaleDateString('pt-BR');
      }
    },
    { field: 'telefone', headerName: 'Telefone', filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'nome_resp1', headerName: 'Nome Responsável', filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'telefone_resp1', headerName: 'Telefone Responsável', filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'parentesco_resp1', headerName: 'Parentesco', filter: 'agTextColumnFilter', floatingFilter: true },
    {
      headerName: 'Ações',
      cellRenderer: (params: any) => {
        const aluno = params.data;
        const editBtn = this.canEdit ?
          `<button type="button" class="btn btn-warning btn-rounded btn-sm btn-icon" data-action="edit" data-id="${aluno.id}">
            <i class="fas fa-edit"></i>
          </button>` : '';
        const delBtn = this.canDelete ?
          `<button type="button" class="btn btn-danger btn-rounded btn-sm btn-icon" data-action="delete" data-id="${aluno.id}">
            <i class="fas fa-trash-alt"></i>
          </button>` : '';
        const matriculaBtn = this.canMatricular ?
          `<button type="button" class="btn btn-success btn-rounded btn-sm btn-icon" data-action="matricular" data-id="${aluno.id}">
            <i class="fas fa-user-plus"></i>
          </button>` : '';
        return `
          <button type="button" class="btn btn-info btn-rounded btn-sm btn-icon" data-action="view" data-id="${aluno.id}">
            <i class="fas fa-eye"></i>
          </button>
          ${matriculaBtn}
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

  rowData: Aluno[] = [];
  alunosService = inject(AlunosService);
  router = inject(Router);
  usuariosService = inject(UsuariosService);

  get canAdd() {
    return this.usuariosService.hasPermission('/alunos', 'POST');
  }

  get canEdit() {
    return this.usuariosService.hasPermission('/alunos', 'PUT');
  }

  get canDelete() {
    return this.usuariosService.hasPermission('/alunos', 'DELETE');
  }

  get canMatricular() {
    return this.usuariosService.hasPermission('/matriculas', 'POST');
  }

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
        this.router.navigate(['/admin/alunos/edit', id]);
      } else if (action === 'view') {
        this.viewById(Number(id));
      } else if (action === 'delete') {
        this.deleteById(Number(id));
      } else if (action === 'matricular') {
        this.router.navigate(['/admin/matriculas/new'], { queryParams: { alunoId: id } });
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
    this.alunosService.findAll().subscribe({
      next: lista => {
        this.rowData = lista;
      },
      error: () => {
        Swal.fire({
          title: 'Ocorreu um erro!',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  onGridReady(params: GridReadyEvent<Aluno>) {
    this.gridApi = params.api;
    setTimeout(() => {
      params.api.sizeColumnsToFit();
    }, 50);
  }

  viewById(id: number) {
    const aluno = this.rowData.find(a => a.id === id);
    if (aluno) {
      const dataNasc = aluno.data ? new Date(aluno.data).toLocaleDateString('pt-BR') : '';
      Swal.fire({
        title: 'Aluno',
        html: `
          <p><strong>Nome:</strong> ${aluno.nome}</p>
          <p><strong>Data de Nascimento:</strong> ${dataNasc}</p>
          <p><strong>Telefone:</strong> ${aluno.telefone}</p>
          <p><strong>Nome Responsável:</strong> ${aluno.nome_resp1}</p>
          <p><strong>Parentesco:</strong> ${aluno.parentesco_resp1}</p>
        `,
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
        this.alunosService.delete(id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Aluno Excluído com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            this.findAll();
          },
          error: () => {
            Swal.fire({
              title: 'Ocorreu um erro!',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        });
      }
    });
  }
}
