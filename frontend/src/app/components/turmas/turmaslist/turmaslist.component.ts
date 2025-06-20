import { TurmasService } from './../../../services/turmas.service';
import { Component, inject } from '@angular/core';
import { Turma } from '../../../models/turmas';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ColDef, GridApi, GridReadyEvent, GridOptions } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';
import { ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';


// Registra todos os módulos da versão Community
ModuleRegistry.registerModules([AllCommunityModule]);



@Component({
  selector: 'app-turmaslist',
  standalone: true,
  imports: [AgGridModule,RouterLink],
  templateUrl: './turmaslist.component.html',
  styleUrl: './turmaslist.component.css'
})
export class TurmaslistComponent {

  private gridApi!: GridApi<Turma>;
  public gridOptions: GridOptions<Turma> = {
    pagination: true,
    paginationPageSize: 20,
    theme: "legacy"  ,
    localeText: {
    // Traduções adicionais ou sobrescritas
    page: 'Página',
    to: 'até',
    of: 'de',
    more: 'mais',
    next: 'Próxima',
    last: 'Última',
    first: 'Primeira',
    previous: 'Anterior',
    loadingOoo: 'Carregando...',
    noRowsToShow: 'Nenhum registro encontrado',
    // Filtros
    equals: 'Igual',
    notEqual: 'Diferente',
    lessThan: 'Menor que',
    greaterThan: 'Maior que',
    contains: 'Contém',
    notContains: 'Não contém',
    startsWith: 'Começa com',
    endsWith: 'Termina com',
    // Menu
    filterOoo: 'Filtrar...',
    applyFilter: 'Aplicar filtro',
    resetFilter: 'Limpar filtro',
    clearFilter: 'Limpar filtro',
    // Paginação
    pageSizeSelectorLabel: 'Registros por página:',
    // Outros textos
    sum: 'Soma',
    min: 'Mínimo',
    max: 'Máximo',
    none: 'Nenhum',
    count: 'Contagem',
    average: 'Média',
  },

    domLayout: 'autoHeight'
  };

  // Configuração das colunas
  colDefs: ColDef<Turma>[] = [
    { field: 'id', headerName: 'ID', filter: 'agNumberColumnFilter', floatingFilter: true  },
    { field: 'nome', headerName: 'Nome', filter: 'agTextColumnFilter', floatingFilter: true  },
    { field: 'ano', headerName: 'Ano', filter: 'agTextColumnFilter', floatingFilter: true  },
    { field: 'turno', headerName: 'Turno', filter: 'agTextColumnFilter', floatingFilter: true  },
    { field: 'sala', headerName: 'Sala', filter: 'agTextColumnFilter', floatingFilter: true  },
    { field: 'nivel', headerName: 'Nível', filter: 'agTextColumnFilter', floatingFilter: true },
    {
      headerName: 'Ações',
      cellRenderer: (params: any) => {
        const turma = params.data;
        return `
          <button type="button" class="btn btn-info btn-rounded btn-sm btn-icon" data-action="view" data-id="${turma.id}">
            <i class="fas fa-eye"></i>
          </button>
          <button type="button" class="btn btn-warning btn-rounded btn-sm btn-icon" data-action="edit" data-id="${turma.id}">
            <i class="fas fa-edit"></i>
          </button>
           <button type="button" class="btn btn-danger btn-rounded btn-sm btn-icon" data-action="delete" data-id="${turma.id}">
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

  rowData: Turma[] = [];
  turmasService = inject(TurmasService);
  router = inject(Router);

  constructor() {
    this.findAll();
  }

  ngAfterViewInit() {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const button = target.closest('button[data-action]');

      if (button) {
        const action = button.getAttribute('data-action');
        const id = button.getAttribute('data-id');

        if (action === 'edit') {
          this.router.navigate(['/admin/turmas/edit', id]);
        } else if (action === 'view') {
          this.viewById(Number(id));
        } else if (action === 'delete') {
          this.deleteById(Number(id));
        }
      }
    });
  }

 findAll() {
  this.turmasService.findAll().subscribe({
    next: lista => {
      console.log('Dados recebidos:', lista);
      this.rowData = lista;
    },
      error: erro => {
        Swal.fire({
          title: "Ocorreu um erro!",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  onGridReady(params: GridReadyEvent<Turma>) {
    this.gridApi = params.api;
    // Ajusta as colunas ao espaço disponível após o carregamento
    setTimeout(() => {
      params.api.sizeColumnsToFit();
    }, 50);
  }

  viewById(id: number) {
    const turma = this.rowData.find(t => t.id === id);
    if (turma) {
      Swal.fire({
        title: 'Turma',
        html: `
          <p><strong>Nome:</strong> ${turma.nome}</p>
          <p><strong>Ano:</strong> ${turma.ano}</p>
          <p><strong>Turno:</strong> ${turma.turno}</p>
          <p><strong>Sala:</strong> ${turma.sala}</p>
          <p><strong>Nível:</strong> ${turma.nivel}</p>
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
      denyButtonText: "Não"
    }).then((result) => {
      if (result.isConfirmed) {
        this.turmasService.delete(id).subscribe({
          next: () => {
            Swal.fire({
              title: "Turma Excluída com sucesso!",
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            this.findAll();
          },
          error: () => {
            Swal.fire({
              title: "Ocorreu um erro!",
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        });
      }
    });
  }
}
