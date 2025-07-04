import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Matricula } from '../../../models/matricula';
import { Aluno } from '../../../models/aluno';
import { Turma } from '../../../models/turmas';
import { PlanoPagamento } from '../../../models/plano-pagamento';
import { MatriculaService } from '../../../services/matricula.service';
import { AlunosService } from '../../../services/alunos.service';
import { TurmasService } from '../../../services/turmas.service';
import { PlanoPagamentoService } from '../../../services/plano-pagamento.service';

@Component({
  selector: 'app-matriculasdetails',
  standalone: true,
  imports: [CommonModule, MdbFormsModule, MdbRippleModule, FormsModule],
  templateUrl: './matriculasdetails.component.html',
  styleUrl: './matriculasdetails.component.css'
})
export class MatriculasdetailsComponent implements OnInit {

  matricula: Matricula = new Matricula(null, null, null);
  alunos: Aluno[] = [];
  turmas: Turma[] = [];
  planos: PlanoPagamento[] = [];
  ano?: string;
  semestre?: string;

  router = inject(ActivatedRoute);
  router2 = inject(Router);
  matriculaService = inject(MatriculaService);
  alunosService = inject(AlunosService);
  turmasService = inject(TurmasService);
  planosService = inject(PlanoPagamentoService);

  compareAlunoFn(a1: Aluno | null, a2: Aluno | null): boolean {
    return a1 !== null && a2 !== null ? a1.id === a2.id : a1 === a2;
  }

  compareTurmaFn(t1: Turma | null, t2: Turma | null): boolean {
    return t1 !== null && t2 !== null ? t1.id === t2.id : t1 === t2;
  }

  comparePlanoFn(p1: PlanoPagamento | null, p2: PlanoPagamento | null): boolean {
    return p1 !== null && p2 !== null ? p1.id === p2.id : p1 === p2;
  }

  constructor() {
    const id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  ngOnInit(): void {
    this.loadAlunos();
    this.loadTurmas();
    this.loadPlanos();
  }

  loadAlunos() {
    this.alunosService.findAll().subscribe({
      next: lista => this.alunos = lista,
      error: () => Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' })
    });
  }

  loadTurmas() {
    this.turmasService.findAll().subscribe({
      next: lista => this.turmas = lista,
      error: () => Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' })
    });
  }

  loadPlanos() {
    this.planosService.findAll().subscribe({
      next: lista => this.planos = lista,
      error: () => Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' })
    });
  }

  findById(id: number) {
    this.matriculaService.findById(id).subscribe({
      next: ret => this.matricula = ret,
      error: () => Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' })
    });
  }

  save() {
    if (this.matricula.id) {
      this.matriculaService.update(this.matricula).subscribe({
        next: () => {
          Swal.fire({ title: 'Matrícula editada com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
          this.router2.navigate(['admin/matriculas']);
        },
        error: () => {
          Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
        }
      });
    } else {
      const matParaSalvar = { ...this.matricula } as Matricula;
      delete matParaSalvar.id;
      this.matriculaService.save(matParaSalvar).subscribe({
        next: () => {
          Swal.fire({ title: 'Matrícula cadastrada com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
          this.router2.navigate(['admin/matriculas']);
        },
        error: erro => {
          console.error('Erro completo:', erro);
          Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
        }
      });
    }
  }
}
