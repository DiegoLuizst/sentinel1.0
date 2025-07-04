import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { LancamentoFinanceiro } from '../../../models/lancamento-financeiro';
import { LancamentoFinanceiroService } from '../../../services/lancamento-financeiro.service';
import { UsuariosService } from '../../../services/usuarios.service';
import Swal from 'sweetalert2';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-caixalist',
  standalone: true,
  imports: [CommonModule, AgGridModule, MdbRippleModule],
  templateUrl: './caixalist.component.html'
})
export class CaixalistComponent {
  private gridApi!: GridApi<LancamentoFinanceiro>;
  public gridOptions: GridOptions<LancamentoFinanceiro> = {
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

  colDefs: ColDef<LancamentoFinanceiro>[] = [
    {
      field: 'data',
      headerName: 'Data',
      filter: 'agDateColumnFilter',
      floatingFilter: true,
      valueFormatter: p => p.value ? new Date(p.value).toLocaleDateString('pt-BR') : ''
    },
    { field: 'saldoDiario', headerName: 'Saldo Diário', filter: 'agNumberColumnFilter', floatingFilter: true },
    { field: 'saldoMensal', headerName: 'Saldo Mensal', filter: 'agNumberColumnFilter', floatingFilter: true }
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1
  };

  rowData: LancamentoFinanceiro[] = [];
  lancamentoService = inject(LancamentoFinanceiroService);
  usuariosService = inject(UsuariosService);

  constructor() {
    this.findAll();
  }

  findAll() {
    this.lancamentoService.findAll().subscribe({
      next: lista => this.rowData = lista,
      error: () => Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' })
    });
  }

  onGridReady(params: GridReadyEvent<LancamentoFinanceiro>) {
    this.gridApi = params.api;
    setTimeout(() => { params.api.sizeColumnsToFit(); }, 50);
  }
}
