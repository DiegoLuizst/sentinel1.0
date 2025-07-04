import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DescontoService } from '../../../services/desconto.service';

interface DescontoForm {
  id?: number;
  descricao: string;
  tipo: string;
  valor: number;
  criterio: string;
}

@Component({
  selector: 'app-descontosdetails',
  standalone: true,
  imports: [CommonModule, MdbFormsModule, MdbRippleModule, FormsModule],
  templateUrl: './descontosdetails.component.html'
})
export class DescontosdetailsComponent {
  desconto: DescontoForm = { descricao: '', tipo: '', valor: 0, criterio: '' };
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  descontoService = inject(DescontoService);

  constructor() {
    const id = this.router.snapshot.params['id'];
    if (id) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.descontoService.findById(id).subscribe({
      next: d => this.desconto = d as unknown as DescontoForm,
      error: () => Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' })
    });
  }

  save() {
    if (this.desconto.id) {
      this.descontoService.update(this.desconto as any).subscribe({
        next: () => {
          Swal.fire({ title: 'Desconto editado com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
          this.router2.navigate(['admin/descontos']);
        },
        error: () => Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' })
      });
    } else {
      const obj = { ...this.desconto } as any;
      delete obj.id;
      this.descontoService.save(obj).subscribe({
        next: () => {
          Swal.fire({ title: 'Desconto cadastrado com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
          this.router2.navigate(['admin/descontos']);
        },
        error: () => Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' })
      });
    }
  }
}
