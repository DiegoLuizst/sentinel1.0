import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { PlanoPagamento } from '../../../models/plano-pagamento';
import { PlanoPagamentoService } from '../../../services/plano-pagamento.service';
import { UsuariosService } from '../../../services/usuarios.service';
import Swal from 'sweetalert2';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-planoslist',
  standalone: true,
  imports: [CommonModule, AgGridModule, MdbRippleModule, RouterLink],
  templateUrl: './planoslist.component.html'
})
export class PlanoslistComponent {
  private gridApi!: GridApi<PlanoPagamento>;
  public gridOptions: GridOptions<PlanoPagamento> = {
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

  colDefs: ColDef<PlanoPagamento>[] = [
    { field: 'descricao', headerName: 'Descrição', filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'numeroParcelas', headerName: 'Número de Parcelas', filter: 'agNumberColumnFilter', floatingFilter: true },
    { field: 'periodicidade', headerName: 'Periodicidade', filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'valorTotal', headerName: 'Valor Total', filter: 'agNumberColumnFilter', floatingFilter: true },
    {
      headerName: 'Ações',
      cellRenderer: (params: any) => {
        const plano = params.data;
        const editBtn = this.canEdit ?
          `<button type="button" class="btn btn-warning btn-rounded btn-sm btn-icon" data-action="edit" data-id="${plano.id}">`+
          `<i class="fas fa-edit"></i>`+
          `</button>` : '';
        const delBtn = this.canDelete ?
          `<button type="button" class="btn btn-danger btn-rounded btn-sm btn-icon" data-action="delete" data-id="${plano.id}">`+
          `<i class="fas fa-trash-alt"></i>`+
          `</button>` : '';
        return `
          <button type="button" class="btn btn-info btn-rounded btn-sm btn-icon" data-action="view" data-id="${plano.id}">
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

  rowData: PlanoPagamento[] = [];
  planosService = inject(PlanoPagamentoService);
  router = inject(Router);
  usuariosService = inject(UsuariosService);

  get canAdd() { return this.usuariosService.hasPermission('/planos-pagamento', 'POST'); }
  get canEdit() { return this.usuariosService.hasPermission('/planos-pagamento', 'PUT'); }
  get canDelete() { return this.usuariosService.hasPermission('/planos-pagamento', 'DELETE'); }

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
        // rota de edição ainda não criada
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
    this.planosService.findAll().subscribe({
      next: lista => this.rowData = lista,
      error: () => {
        Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
      }
    });
  }

  onGridReady(params: GridReadyEvent<PlanoPagamento>) {
    this.gridApi = params.api;
    setTimeout(() => { params.api.sizeColumnsToFit(); }, 50);
  }

  viewById(id: number) {
    const plano = this.rowData.find(p => p.id === id);
    if (plano) {
      Swal.fire({
        title: 'Plano de Pagamento',
        html: `
          <p><strong>Descrição:</strong> ${plano.descricao}</p>
          <p><strong>Número de Parcelas:</strong> ${plano.numeroParcelas}</p>
          <p><strong>Periodicidade:</strong> ${plano.periodicidade}</p>
          <p><strong>Valor Total:</strong> ${plano.valorTotal}</p>
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
        this.planosService.delete(id).subscribe({
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
