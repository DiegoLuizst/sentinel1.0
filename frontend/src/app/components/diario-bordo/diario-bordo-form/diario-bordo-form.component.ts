import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DiarioBordoService } from '../../../services/diario-bordo.service';
import { DiarioBordo } from '../../../models/diario-bordo';

@Component({
  selector: 'app-diario-bordo-form',
  standalone: true,
  imports: [CommonModule, MdbFormsModule, MdbRippleModule, FormsModule],
  templateUrl: './diario-bordo-form.component.html'
})
export class DiarioBordoFormComponent {
  diario: DiarioBordo = new DiarioBordo(null, '', null, null, null);
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  diarioService = inject(DiarioBordoService);

  constructor() {
    const id = this.router.snapshot.params['id'];
    if (id) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.diarioService.findById(id).subscribe({
      next: d => this.diario = d,
      error: () => Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' })
    });
  }

  save() {
    if (this.diario.id) {
      this.diarioService.update(this.diario).subscribe({
        next: () => {
          Swal.fire({ title: 'Registro editado!', icon: 'success', confirmButtonText: 'Ok' });
          this.router2.navigate(['admin/diario-bordo']);
        },
        error: () => Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' })
      });
    } else {
      const obj = { ...this.diario };
      delete obj.id;
      this.diarioService.save(obj).subscribe({
        next: () => {
          Swal.fire({ title: 'Registro cadastrado!', icon: 'success', confirmButtonText: 'Ok' });
          this.router2.navigate(['admin/diario-bordo']);
        },
        error: () => Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' })
      });
    }
  }
}
