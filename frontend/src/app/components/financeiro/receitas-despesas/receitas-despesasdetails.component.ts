import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Receita } from '../../../models/receita';
import { Despesa } from '../../../models/despesa';
import { ReceitaService } from '../../../services/receita.service';
import { DespesaService } from '../../../services/despesa.service';

interface LancamentoForm {
  descricao: string;
  categoria: string;
  data: Date | null;
  valor: number;
}

@Component({
  selector: 'app-receitas-despesasdetails',
  standalone: true,
  imports: [CommonModule, MdbFormsModule, MdbRippleModule, FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule],
  templateUrl: './receitas-despesasdetails.component.html'
})
export class ReceitasDespesasdetailsComponent {
  tipo: 'RECEITA' | 'DESPESA' = 'RECEITA';
  lancamento: LancamentoForm = { descricao: '', categoria: '', data: null, valor: 0 };

  receitaService = inject(ReceitaService);
  despesaService = inject(DespesaService);
  router = inject(Router);

  save() {
    if (this.tipo === 'RECEITA') {
      const receita = new Receita(this.lancamento.descricao, this.lancamento.valor, this.lancamento.data, this.lancamento.categoria);
      this.receitaService.save(receita).subscribe({
        next: () => {
          Swal.fire({ title: 'Receita registrada com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
          this.router.navigate(['admin/receitas-despesas']);
        },
        error: () => Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' })
      });
    } else {
      const despesa = new Despesa(this.lancamento.descricao, this.lancamento.valor, this.lancamento.data, this.lancamento.categoria);
      this.despesaService.save(despesa).subscribe({
        next: () => {
          Swal.fire({ title: 'Despesa registrada com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
          this.router.navigate(['admin/receitas-despesas']);
        },
        error: () => Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' })
      });
    }
  }
}
