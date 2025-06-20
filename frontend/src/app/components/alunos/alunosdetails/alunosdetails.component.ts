import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Aluno } from '../../../models/aluno';
import { AlunosService } from '../../../services/alunos.service';

@Component({
  selector: 'app-alunosdetails',
  standalone: true,
  imports: [CommonModule, MdbFormsModule, FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './alunosdetails.component.html',
  styleUrl: './alunosdetails.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlunosdetailsComponent {
  aluno: Aluno = new Aluno(
    '',
    null,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    undefined,
    undefined
  );
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  alunosService = inject(AlunosService);

  generos = ['Masculino', 'Feminino', 'Não Binário', 'Prefere não informar'];
  parentescos = ['Pai', 'Mãe', 'Responsável Legal', 'Avô/Avó', 'Tio/Tia'];

  constructor() {
    const id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.alunosService.findById(id).subscribe({
      next: retorno => {
        this.aluno = retorno;
      },
      error: () => {
        Swal.fire({
          title: 'Ocorreu um erro!',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  save() {
    if (this.aluno.id) {
      this.alunosService.update(this.aluno).subscribe({
        next: () => {
          Swal.fire({
            title: 'Aluno editado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(['admin/alunos'], { state: { alunoEditado: this.aluno } });
        },
        error: () => {
          Swal.fire({
            title: 'Ocorreu um erro!',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
    } else {
      const alunoParaSalvar = { ...this.aluno };
      delete alunoParaSalvar.id;
      this.alunosService.save(alunoParaSalvar).subscribe({
        next: () => {
          Swal.fire({
            title: 'Aluno cadastrado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(['admin/alunos'], { state: { alunoNovo: this.aluno } });
        },
        error: (erro) => {
          console.error('Erro completo:', erro);
          Swal.fire({
            title: 'Ocorreu um erro!',
            text: `Status: ${erro.status} - ${erro.statusText || 'Sem mensagem'}`,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
    }
  }
}
