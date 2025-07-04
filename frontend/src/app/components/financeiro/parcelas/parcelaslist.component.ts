import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { Parcela } from '../../../models/parcela';
import { ParcelaService } from '../../../services/parcela.service';
import { UsuariosService } from '../../../services/usuarios.service';
import Swal from 'sweetalert2';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-parcelaslist',
  standalone: true,
  imports: [CommonModule, AgGridModule, MdbRippleModule, RouterLink],
  templateUrl: './parcelaslist.component.html'
})
export class ParcelaslistComponent {
  private gridApi!: GridApi<Parcela>;
  public gridOptions: GridOptions<Parcela> = {
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

  colDefs: ColDef<Parcela>[] = [
    { field: 'matricula.aluno.nome', headerName: 'Matrícula', valueGetter: params => `${params.data.matricula?.aluno?.nome}/${params.data.matricula?.turma?.nome}`, filter: 'agTextColumnFilter', floatingFilter: true },
    { field: 'numero', headerName: 'Número da Parcela', filter: 'agNumberColumnFilter', floatingFilter: true },
    { field: 'valorOriginal', headerName: 'Valor Original', filter: 'agNumberColumnFilter', floatingFilter: true },
    { field: 'dataVencimento', headerName: 'Data de Vencimento', filter: 'agDateColumnFilter', floatingFilter: true, valueFormatter: p => p.value ? new Date(p.value).toLocaleDateString('pt-BR') : '' },
    { field: 'status', headerName: 'Status', filter: 'agTextColumnFilter', floatingFilter: true },
    {
      headerName: 'Ações',
      cellRenderer: (params: any) => {
        const parcela = params.data;
        const editBtn = this.canEdit ?
          `<button type="button" class="btn btn-warning btn-rounded btn-sm btn-icon" data-action="edit" data-id="${parcela.id}">`+
          `<i class="fas fa-edit"></i>`+
          `</button>` : '';
        const quitBtn = `<button type="button" class="btn btn-success btn-rounded btn-sm btn-icon" data-action="quit" data-id="${parcela.id}">`+
          `<i class="fas fa-check"></i>`+
          `</button>`;
        return `
          <button type="button" class="btn btn-info btn-rounded btn-sm btn-icon" data-action="view" data-id="${parcela.id}">
            <i class="fas fa-eye"></i>
          </button>
          ${editBtn}
          ${quitBtn}`;
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

  rowData: Parcela[] = [];
  parcelasService = inject(ParcelaService);
  router = inject(Router);
  usuariosService = inject(UsuariosService);

  get canAdd() { return this.usuariosService.hasPermission('/parcelas', 'POST'); }
  get canEdit() { return this.usuariosService.hasPermission('/parcelas', 'PUT'); }

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
        // editar pagamento
      } else if (action === 'view') {
        this.viewById(Number(id));
      } else if (action === 'quit') {
        this.markPaid(Number(id));
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
    this.parcelasService.findAll().subscribe({
      next: lista => this.rowData = lista,
      error: () => {
        Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
      }
    });
  }

  onGridReady(params: GridReadyEvent<Parcela>) {
    this.gridApi = params.api;
    setTimeout(() => { params.api.sizeColumnsToFit(); }, 50);
  }

  viewById(id: number) {
    const parcela = this.rowData.find(p => p.id === id);
    if (parcela) {
      const dataVenc = parcela.dataVencimento ? new Date(parcela.dataVencimento).toLocaleDateString('pt-BR') : '';
      Swal.fire({
        title: 'Parcela',
        html: `
          <p><strong>Matrícula:</strong> ${parcela.matricula?.aluno?.nome}/${parcela.matricula?.turma?.nome}</p>
          <p><strong>Número:</strong> ${parcela.numero}</p>
          <p><strong>Valor:</strong> ${parcela.valorOriginal}</p>
          <p><strong>Vencimento:</strong> ${dataVenc}</p>
          <p><strong>Status:</strong> ${parcela.status}</p>
        `,
        icon: 'info'
      });
    }
  }

  markPaid(id: number) {
    // aqui faria requisição para marcar como quitada
    Swal.fire({ title: 'Parcela quitada!', icon: 'success', confirmButtonText: 'Ok' });
  }
}
