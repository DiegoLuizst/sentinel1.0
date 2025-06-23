import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import Swal from 'sweetalert2';
import { PermissaoGrupo } from '../../../models/permissao-grupo';
import { PermissaoGrupoService } from '../../../services/permissao-grupo.service';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-permissao-grupo-list',
  standalone: true,
  imports: [AgGridModule, MdbRippleModule, RouterLink],
  templateUrl: './permissao-grupo-list.component.html',
  styleUrl: './permissao-grupo-list.component.css'
})
export class PermissaoGrupoListComponent {

  private gridApi!: GridApi<PermissaoGrupo>;
  public gridOptions: GridOptions<PermissaoGrupo> = {
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

  colDefs: ColDef<PermissaoGrupo>[] = [
    { field: 'id', headerName: 'ID', filter: 'agNumberColumnFilter', floatingFilter: true },
    { field: 'nome', headerName: 'Nome', filter: 'agTextColumnFilter', floatingFilter: true },
    {
      headerName: 'Ações',
      cellRenderer: (params: any) => {
        const pg = params.data;
        return `
          <button type="button" class="btn btn-info btn-rounded btn-sm btn-icon" data-action="view" data-id="${pg.id}">
            <i class="fas fa-eye"></i>
          </button>
          <button type="button" class="btn btn-warning btn-rounded btn-sm btn-icon" data-action="edit" data-id="${pg.id}">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" class="btn btn-danger btn-rounded btn-sm btn-icon" data-action="delete" data-id="${pg.id}">
            <i class="fas fa-trash-alt"></i>
          </button>
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

  rowData: PermissaoGrupo[] = [];
  pgService = inject(PermissaoGrupoService);
  router = inject(Router);

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
        this.router.navigate(['/admin/permissao/edit', id]);
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
    this.pgService.findAll().subscribe({
      next: lista => { this.rowData = lista; },
      error: () => {
        Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
      }
    });
  }

  onGridReady(params: GridReadyEvent<PermissaoGrupo>) {
    this.gridApi = params.api;
    setTimeout(() => { params.api.sizeColumnsToFit(); }, 50);
  }

  viewById(id: number) {
    const grupo = this.rowData.find(g => g.id === id);
    if (grupo) {
      Swal.fire({
        title: 'Permissão Grupo',
        html: `
          <p><strong>Nome:</strong> ${grupo.nome}</p>
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
        this.pgService.delete(id).subscribe({
          next: () => {
            Swal.fire({ title: 'Registro excluído!', icon: 'success', confirmButtonText: 'Ok' });
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
