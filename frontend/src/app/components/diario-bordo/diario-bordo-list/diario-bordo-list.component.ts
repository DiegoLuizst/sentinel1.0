import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { DiarioBordo } from '../../../models/diario-bordo';
import { DiarioBordoService } from '../../../services/diario-bordo.service';
import Swal from 'sweetalert2';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-diario-bordo-list',
  standalone: true,
  imports: [CommonModule, AgGridModule, MdbRippleModule, RouterLink],
  templateUrl: './diario-bordo-list.component.html'
})
export class DiarioBordoListComponent {
  private gridApi!: GridApi<DiarioBordo>;
  public gridOptions: GridOptions<DiarioBordo> = {
    pagination: true,
    paginationPageSize: 20,
    domLayout: 'autoHeight'
  };

  colDefs: ColDef<DiarioBordo>[] = [
    { field: 'data', headerName: 'Data', valueFormatter: p => p.value ? new Date(p.value).toLocaleDateString('pt-BR') : '' },
    { field: 'anotacao', headerName: 'Anotação' }
  ];

  defaultColDef: ColDef = { sortable: true, filter: true, resizable: true, flex: 1 };

  rowData: DiarioBordo[] = [];
  diarioService = inject(DiarioBordoService);

  constructor() { this.findAll(); }

  findAll() {
    this.diarioService.findAll().subscribe({
      next: lista => this.rowData = lista,
      error: () => Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' })
    });
  }

  onGridReady(params: GridReadyEvent<DiarioBordo>) {
    this.gridApi = params.api;
    setTimeout(() => params.api.sizeColumnsToFit(), 50);
  }
}
