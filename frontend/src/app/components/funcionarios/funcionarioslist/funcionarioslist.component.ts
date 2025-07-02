import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import Swal from 'sweetalert2';
import { Funcionario } from '../../../models/funcionario';
import { FuncionarioService } from '../../../services/funcionario.service';
import { UsuariosService } from '../../../services/usuarios.service';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-funcionarioslist',
  standalone: true,
  imports: [CommonModule, AgGridModule, MdbRippleModule, RouterLink],
  templateUrl: './funcionarioslist.component.html',
  styleUrl: './funcionarioslist.component.css'
})
export class FuncionarioslistComponent {

  private gridApi!: GridApi<Funcionario>;
  public gridOptions: GridOptions<Funcionario> = {
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

  colDefs: ColDef<Funcionario>[] = [
    { field: 'id', headerName: 'ID', filter: 'agNumberColumnFilter', floatingFilter: true },
    { field: 'nome', headerName: 'Nome', filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'email', headerName: 'Email', filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'telefone', headerName: 'Telefone', filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'cargo.nome', headerName: 'Cargo', valueGetter: params => params.data?.cargo?.nome, filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'status', headerName: 'Status', filter: 'agTextColumnFilter', floatingFilter: true },
    {
      headerName: 'Ações',
      cellRenderer: (params: any) => {
        const funcionario = params.data;
        const editBtn = this.canEdit ?
          `<button type="button" class="btn btn-warning btn-rounded btn-sm btn-icon" data-action="edit" data-id="${funcionario.id}">
            <i class="fas fa-edit"></i>
          </button>` : '';
        const delBtn = this.canDelete ?
          `<button type="button" class="btn btn-danger btn-rounded btn-sm btn-icon" data-action="delete" data-id="${funcionario.id}">
            <i class="fas fa-trash-alt"></i>
          </button>` : '';
        return `
          <button type="button" class="btn btn-info btn-rounded btn-sm btn-icon" data-action="view" data-id="${funcionario.id}">
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

  rowData: Funcionario[] = [];
  funcionarioService = inject(FuncionarioService);
  router = inject(Router);
  usuariosService = inject(UsuariosService);

  get canAdd() { return this.usuariosService.hasPermission('/funcionarios','POST'); }
  get canEdit() { return this.usuariosService.hasPermission('/funcionarios','PUT'); }
  get canDelete() { return this.usuariosService.hasPermission('/funcionarios','DELETE'); }

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
        this.router.navigate(['/admin/funcionarios/edit', id]);
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
    this.funcionarioService.findAll().subscribe({
      next: lista => { this.rowData = lista; },
      error: () => {
        Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
      }
    });
  }

  onGridReady(params: GridReadyEvent<Funcionario>) {
    this.gridApi = params.api;
    setTimeout(() => { params.api.sizeColumnsToFit(); }, 50);
  }

  viewById(id: number) {
    const funcionario = this.rowData.find(c => c.id === id);
    if (funcionario) {
        Swal.fire({
          title: 'Funcionário',
          html: `<p><strong>Nome:</strong> ${funcionario.nome}</p><p><strong>Email:</strong> ${funcionario.email}</p><p><strong>Cargo:</strong> ${funcionario.cargo?.nome || ''}</p><p><strong>Status:</strong> ${funcionario.status}</p>`,
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
        this.funcionarioService.delete(id).subscribe({
          next: () => {
            Swal.fire({ title: 'Funcionário Excluído com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
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
