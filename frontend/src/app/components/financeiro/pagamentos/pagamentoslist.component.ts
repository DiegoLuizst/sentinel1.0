import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { Pagamento } from '../../../models/pagamento';
import { PagamentoService } from '../../../services/pagamento.service';
import { UsuariosService } from '../../../services/usuarios.service';
import Swal from 'sweetalert2';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-pagamentoslist',
  standalone: true,
  imports: [CommonModule, AgGridModule, MdbRippleModule, RouterLink],
  templateUrl: './pagamentoslist.component.html'
})
export class PagamentoslistComponent {
  private gridApi!: GridApi<Pagamento>;
  public gridOptions: GridOptions<Pagamento> = {
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

  colDefs: ColDef<Pagamento>[] = [
    { field: 'parcela.numero', headerName: 'Parcela', valueGetter: p => p.data.parcela?.numero, filter: 'agNumberColumnFilter', floatingFilter: true },
    { field: 'dataPagamento', headerName: 'Data do Pagamento', filter: 'agDateColumnFilter', floatingFilter: true, valueFormatter: p => p.value ? new Date(p.value).toLocaleDateString('pt-BR') : '' },
    { field: 'valorPago', headerName: 'Valor Pago', filter: 'agNumberColumnFilter', floatingFilter: true },
    { field: 'formaPagamento', headerName: 'Forma de Pagamento', filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'desconto.valor', headerName: 'Desconto Aplicado', valueGetter: p => p.data.desconto ? p.data.desconto.valor : '', filter: false },
    {
      headerName: 'Ações',
      cellRenderer: (params: any) => {
        const pagamento = params.data;
        const delBtn = this.canDelete ?
          `<button type="button" class="btn btn-danger btn-rounded btn-sm btn-icon" data-action="delete" data-id="${pagamento.id}">`+
          `<i class="fas fa-trash-alt"></i>`+
          `</button>` : '';
        return `
          <button type="button" class="btn btn-info btn-rounded btn-sm btn-icon" data-action="view" data-id="${pagamento.id}">
            <i class="fas fa-eye"></i>
          </button>
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

  rowData: Pagamento[] = [];
  pagamentosService = inject(PagamentoService);
  router = inject(Router);
  usuariosService = inject(UsuariosService);

  get canAdd() { return this.usuariosService.hasPermission('/pagamentos', 'POST'); }
  get canDelete() { return this.usuariosService.hasPermission('/pagamentos', 'DELETE'); }

  constructor() {
    this.findAll();
  }

  private clickListener = (event: Event) => {
    const target = event.target as HTMLElement;
    const button = target.closest('button[data-action]');
    if (button) {
      const action = button.getAttribute('data-action');
      const id = button.getAttribute('data-id');
      if (action === 'view') {
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
    this.pagamentosService.findAll().subscribe({
      next: lista => this.rowData = lista,
      error: () => {
        Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
      }
    });
  }

  onGridReady(params: GridReadyEvent<Pagamento>) {
    this.gridApi = params.api;
    setTimeout(() => { params.api.sizeColumnsToFit(); }, 50);
  }

  viewById(id: number) {
    const pagamento = this.rowData.find(p => p.id === id);
    if (pagamento) {
      const dataPag = pagamento.dataPagamento ? new Date(pagamento.dataPagamento).toLocaleDateString('pt-BR') : '';
      Swal.fire({
        title: 'Pagamento',
        html: `
          <p><strong>Parcela:</strong> ${pagamento.parcela?.numero}</p>
          <p><strong>Data:</strong> ${dataPag}</p>
          <p><strong>Valor Pago:</strong> ${pagamento.valorPago}</p>
          <p><strong>Forma de Pagamento:</strong> ${pagamento.formaPagamento}</p>
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
        this.pagamentosService.delete(id).subscribe({
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
