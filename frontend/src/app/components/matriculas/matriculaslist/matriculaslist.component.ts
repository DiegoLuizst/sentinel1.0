import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { Matricula } from '../../../models/matricula';
import { MatriculaService } from '../../../services/matricula.service';
import { UsuariosService } from '../../../services/usuarios.service';
import Swal from 'sweetalert2';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-matriculaslist',
  standalone: true,
  imports: [CommonModule, AgGridModule, MdbRippleModule, RouterLink],
  templateUrl: './matriculaslist.component.html',
  styleUrl: './matriculaslist.component.css'
})
export class MatriculaslistComponent {
  private gridApi!: GridApi<Matricula>;
  public gridOptions: GridOptions<Matricula> = {
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

  colDefs: ColDef<Matricula>[] = [
    { field: 'aluno.nome', headerName: 'Aluno', valueGetter: params => params.data?.aluno?.nome, filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'turma.nome', headerName: 'Turma', valueGetter: params => params.data?.turma?.nome, filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'planoPagamento.descricao', headerName: 'Plano de Pagamento', valueGetter: params => params.data?.planoPagamento?.descricao, filter: 'agTextColumnFilter', floatingFilter: true },
    {
      headerName: 'Ações',
      cellRenderer: (params: any) => {
        const matricula = params.data;
        const editBtn = this.canEdit ?
          `<button type="button" class="btn btn-warning btn-rounded btn-sm btn-icon" data-action="edit" data-id="${matricula.id}">`+
          `<i class="fas fa-edit"></i>`+
          `</button>` : '';
        const delBtn = this.canDelete ?
          `<button type="button" class="btn btn-danger btn-rounded btn-sm btn-icon" data-action="delete" data-id="${matricula.id}">`+
          `<i class="fas fa-trash-alt"></i>`+
          `</button>` : '';
        return `
          <button type="button" class="btn btn-info btn-rounded btn-sm btn-icon" data-action="view" data-id="${matricula.id}">
            <i class="fas fa-eye"></i>
          </button>
          ${editBtn}
          ${delBtn}`;
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

  rowData: Matricula[] = [];
  matriculasService = inject(MatriculaService);
  router = inject(Router);
  usuariosService = inject(UsuariosService);

  get canAdd() { return this.usuariosService.hasPermission('/matriculas', 'POST'); }
  get canEdit() { return this.usuariosService.hasPermission('/matriculas', 'PUT'); }
  get canDelete() { return this.usuariosService.hasPermission('/matriculas', 'DELETE'); }

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
        this.router.navigate(['/admin/matriculas/edit', id]);
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
    this.matriculasService.findAll().subscribe({
      next: lista => this.rowData = lista,
      error: () => {
        Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
      }
    });
  }

  onGridReady(params: GridReadyEvent<Matricula>) {
    this.gridApi = params.api;
    setTimeout(() => { params.api.sizeColumnsToFit(); }, 50);
  }

  viewById(id: number) {
    const mat = this.rowData.find(m => m.id === id);
    if (mat) {
      Swal.fire({
        title: 'Matrícula',
        html: `
          <p><strong>Aluno:</strong> ${mat.aluno?.nome}</p>
          <p><strong>Turma:</strong> ${mat.turma?.nome}</p>
          <p><strong>Plano de Pagamento:</strong> ${mat.planoPagamento?.descricao}</p>
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
    }).then(result => {
      if (result.isConfirmed) {
        this.matriculasService.delete(id).subscribe({
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
