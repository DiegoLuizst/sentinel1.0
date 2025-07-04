import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Pagamento } from '../../../models/pagamento';
import { Parcela } from '../../../models/parcela';
import { PagamentoService } from '../../../services/pagamento.service';
import { ParcelaService } from '../../../services/parcela.service';

@Component({
  selector: 'app-pagamentosdetails',
  standalone: true,
  imports: [CommonModule, MdbFormsModule, MdbRippleModule, FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule],
  templateUrl: './pagamentosdetails.component.html'
})
export class PagamentosdetailsComponent implements OnInit {
  pagamento: Pagamento = new Pagamento(null, null, 0, '');
  parcelas: Parcela[] = [];
  parcelaPreDefinida = false;

  router = inject(ActivatedRoute);
  router2 = inject(Router);
  pagamentoService = inject(PagamentoService);
  parcelaService = inject(ParcelaService);

  ngOnInit(): void {
    const parcelaId = this.router.snapshot.params['parcelaId'];
    if (parcelaId) {
      this.parcelaService.findById(parcelaId).subscribe({
        next: p => { this.pagamento.parcela = p; this.parcelaPreDefinida = true; },
        error: () => Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' })
      });
    } else {
      this.loadParcelas();
    }
  }

  loadParcelas() {
    this.parcelaService.findAll().subscribe({
      next: lista => this.parcelas = lista,
      error: () => Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' })
    });
  }

  compareParcelaFn(p1: Parcela | null, p2: Parcela | null): boolean {
    return p1 !== null && p2 !== null ? p1.id === p2.id : p1 === p2;
  }

  save() {
    if (!this.pagamento.parcela) {
      Swal.fire({ title: 'Selecione a parcela!', icon: 'warning', confirmButtonText: 'Ok' });
      return;
    }
    this.pagamentoService.save(this.pagamento).subscribe({
      next: () => {
        if (this.pagamento.parcela) {
          this.pagamento.parcela.status = 'QUITADO';
          this.parcelaService.update(this.pagamento.parcela).subscribe();
        }
        Swal.fire({ title: 'Pagamento registrado com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
        this.router2.navigate(['admin/pagamentos']);
      },
      error: () => Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' })
    });
  }
}
