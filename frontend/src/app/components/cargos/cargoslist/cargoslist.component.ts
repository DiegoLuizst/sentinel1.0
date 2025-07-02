import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import Swal from 'sweetalert2';
import { Cargo } from '../../../models/cargo';
import { CargoService } from '../../../services/cargo.service';
import { UsuariosService } from '../../../services/usuarios.service';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-cargoslist',
  standalone: true,
  imports: [CommonModule, AgGridModule, MdbRippleModule, RouterLink],
  templateUrl: './cargoslist.component.html',
  styleUrl: './cargoslist.component.css'
})
export class CargoslistComponent {

  private gridApi!: GridApi<Cargo>;
  public gridOptions: GridOptions<Cargo> = {
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

  colDefs: ColDef<Cargo>[] = [
    { field: 'id', headerName: 'ID', filter: 'agNumberColumnFilter', floatingFilter: true },
    { field: 'nome', headerName: 'Nome', filter: 'agTextColumnFilter', floatingFilter: true },
    {
      headerName: 'Ações',
      cellRenderer: (params: any) => {
        const cargo = params.data;
        const editBtn = this.canEdit ?
          `<button type="button" class="btn btn-warning btn-rounded btn-sm btn-icon" data-action="edit" data-id="${cargo.id}">
            <i class="fas fa-edit"></i>
          </button>` : '';
        const delBtn = this.canDelete ?
          `<button type="button" class="btn btn-danger btn-rounded btn-sm btn-icon" data-action="delete" data-id="${cargo.id}">
            <i class="fas fa-trash-alt"></i>
          </button>` : '';
        return `
          <button type="button" class="btn btn-info btn-rounded btn-sm btn-icon" data-action="view" data-id="${cargo.id}">
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

  rowData: Cargo[] = [];
  cargoService = inject(CargoService);
  router = inject(Router);
  usuariosService = inject(UsuariosService);

  get canAdd() { return this.usuariosService.hasPermission('/cargos','POST'); }
  get canEdit() { return this.usuariosService.hasPermission('/cargos','PUT'); }
  get canDelete() { return this.usuariosService.hasPermission('/cargos','DELETE'); }

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
        this.router.navigate(['/admin/cargos/edit', id]);
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
    this.cargoService.findAll().subscribe({
      next: lista => { this.rowData = lista; },
      error: () => {
        Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
      }
    });
  }

  onGridReady(params: GridReadyEvent<Cargo>) {
    this.gridApi = params.api;
    setTimeout(() => { params.api.sizeColumnsToFit(); }, 50);
  }

  viewById(id: number) {
    const cargo = this.rowData.find(c => c.id === id);
    if (cargo) {
      Swal.fire({
        title: 'Cargo',
        html: `<p><strong>Nome:</strong> ${cargo.nome}</p>`,
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
        this.cargoService.delete(id).subscribe({
          next: () => {
            Swal.fire({ title: 'Cargo Excluído com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
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
