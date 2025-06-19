import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbDatepickerModule } from 'mdb-angular-ui-kit/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Aluno } from '../../../models/aluno';
import { AlunosService } from '../../../services/alunos.service';

@Component({
  selector: 'app-alunosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, MdbDatepickerModule],
  templateUrl: './alunosdetails.component.html',
  styleUrl: './alunosdetails.component.css'
})
export class AlunosdetailsComponent {
  aluno: Aluno = new Aluno({ data: null });
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  alunosService = inject(AlunosService);

  generos = ['Masculino', 'Feminino', 'Não Binário', 'Prefere não informar'];
  parentescos = ['Pai', 'Mãe', 'Responsável', 'Avô/Avó', 'Tio/Tia'];

  constructor() {
    const id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.alunosService.findById(id).subscribe({
      next: retorno => {
        this.aluno = new Aluno(retorno);
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
