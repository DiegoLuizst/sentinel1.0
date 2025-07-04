import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Parcela } from '../../../models/parcela';
import { ParcelaService } from '../../../services/parcela.service';

@Component({
  selector: 'app-parcelasdetails',
  standalone: true,
  imports: [CommonModule, MdbFormsModule, MdbRippleModule, FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule],
  templateUrl: './parcelasdetails.component.html',
  styleUrl: './parcelasdetails.component.css'
})
export class ParcelasdetailsComponent implements OnInit {

  parcela: Parcela = new Parcela(null, 0, 0, null, 'ABERTA');
  statusOptions = ['ABERTA', 'PAGA', 'ATRASADA'];
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  parcelaService = inject(ParcelaService);

  constructor() {
    const id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  ngOnInit(): void { }

  findById(id: number) {
    this.parcelaService.findById(id).subscribe({
      next: ret => this.parcela = ret,
      error: () => Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' })
    });
  }

  save() {
    if (!this.parcela.id) {
      return;
    }
    this.parcelaService.update(this.parcela).subscribe({
      next: () => {
        Swal.fire({ title: 'Parcela atualizada com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
        this.router2.navigate(['admin/parcelas']);
      },
      error: () => {
        Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
      }
    });
  }
}
