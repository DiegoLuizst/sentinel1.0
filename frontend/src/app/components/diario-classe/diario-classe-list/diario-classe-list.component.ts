import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { DiarioClasse } from '../../../models/diario-classe';
import { DiarioClasseService } from '../../../services/diario-classe.service';
import Swal from 'sweetalert2';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-diario-classe-list',
  standalone: true,
  imports: [CommonModule, AgGridModule, MdbRippleModule, RouterLink],
  templateUrl: './diario-classe-list.component.html'
})
export class DiarioClasseListComponent {
  private gridApi!: GridApi<DiarioClasse>;
  public gridOptions: GridOptions<DiarioClasse> = {
    pagination: true,
    paginationPageSize: 20,
    domLayout: 'autoHeight'
  };

  colDefs: ColDef<DiarioClasse>[] = [
    { field: 'data', headerName: 'Data', valueFormatter: p => p.value ? new Date(p.value).toLocaleDateString('pt-BR') : '' },
    { field: 'tipo', headerName: 'Tipo' },
    { field: 'valor', headerName: 'Valor' },
    { field: 'observacao', headerName: 'Observação' }
  ];

  defaultColDef: ColDef = { sortable: true, filter: true, resizable: true, flex: 1 };

  rowData: DiarioClasse[] = [];
  diarioService = inject(DiarioClasseService);

  constructor() { this.findAll(); }

  findAll() {
    this.diarioService.findAll().subscribe({
      next: lista => this.rowData = lista,
      error: () => Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' })
    });
  }

  onGridReady(params: GridReadyEvent<DiarioClasse>) {
    this.gridApi = params.api;
    setTimeout(() => params.api.sizeColumnsToFit(), 50);
  }
}
