import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PlanoPagamento } from '../../../models/plano-pagamento';
import { PlanoPagamentoService } from '../../../services/plano-pagamento.service';

@Component({
  selector: 'app-planosdetails',
  standalone: true,
  imports: [CommonModule, MdbFormsModule, MdbRippleModule, FormsModule],
  templateUrl: './planosdetails.component.html'
})
export class PlanosdetailsComponent {

  plano: PlanoPagamento = new PlanoPagamento('', 0, '', 0);
  periodicidades: string[] = ['Mensal', 'Bimestral', 'Trimestral', 'Semestral', 'Anual'];
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  planosService = inject(PlanoPagamentoService);

  constructor() {
    const id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.planosService.findById(id).subscribe({
      next: ret => { this.plano = ret; },
      error: () => {
        Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
      }
    });
  }

  save() {
    if (this.plano.id) {
      this.planosService.update(this.plano).subscribe({
        next: () => {
          Swal.fire({ title: 'Plano editado com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
          this.router2.navigate(['admin/planos']);
        },
        error: () => {
          Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
        }
      });
    } else {
      const planoParaSalvar = { ...this.plano } as PlanoPagamento;
      delete planoParaSalvar.id;
      this.planosService.save(planoParaSalvar).subscribe({
        next: () => {
          Swal.fire({ title: 'Plano cadastrado com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
          this.router2.navigate(['admin/planos']);
        },
        error: erro => {
          console.error('Erro completo:', erro);
          Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
        }
      });
    }
  }
}
