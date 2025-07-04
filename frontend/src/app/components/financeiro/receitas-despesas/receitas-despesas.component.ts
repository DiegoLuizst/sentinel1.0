import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { DespesaService } from '../../../services/despesa.service';
import { Despesa } from '../../../models/despesa';
import { LancamentoFinanceiroService } from '../../../services/lancamento-financeiro.service';
import { LancamentoFinanceiro } from '../../../models/lancamento-financeiro';
import { UsuariosService } from '../../../services/usuarios.service';
import Swal from 'sweetalert2';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-receitas-despesas',
  standalone: true,
  imports: [CommonModule, AgGridModule, MdbRippleModule],
  templateUrl: './receitas-despesas.component.html'
})
export class ReceitasDespesasComponent {
  private gridApiR!: GridApi<Despesa>;
  private gridApiD!: GridApi<Despesa>;
  public gridOptions: GridOptions<Despesa> = {
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

  colDefs: ColDef<Despesa>[] = [
    { field: 'descricao', headerName: 'Descrição', filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'categoria', headerName: 'Categoria', filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'valor', headerName: 'Valor', filter: 'agNumberColumnFilter', floatingFilter: true },
    { field: 'data', headerName: 'Data', filter: 'agDateColumnFilter', floatingFilter: true, valueFormatter: p => p.value ? new Date(p.value).toLocaleDateString('pt-BR') : '' }
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1
  };

  receitas: Despesa[] = [];
  despesas: Despesa[] = [];
  despesaService = inject(DespesaService);
  lancamentoService = inject(LancamentoFinanceiroService);
  usuariosService = inject(UsuariosService);

  get canAdd() { return this.usuariosService.hasPermission('/lancamentos-financeiros', 'POST'); }

  constructor() {
    this.loadDados();
  }

  loadDados() {
    this.despesaService.findAll().subscribe({
      next: lista => {
        this.receitas = lista.filter(d => d.valor >= 0);
        this.despesas = lista.filter(d => d.valor < 0);
      },
      error: () => Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' })
    });
  }

  onGridReadyReceitas(e: GridReadyEvent<Despesa>) {
    this.gridApiR = e.api;
    setTimeout(() => { e.api.sizeColumnsToFit(); }, 50);
  }

  onGridReadyDespesas(e: GridReadyEvent<Despesa>) {
    this.gridApiD = e.api;
    setTimeout(() => { e.api.sizeColumnsToFit(); }, 50);
  }
}
