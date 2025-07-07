import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Professor } from '../../../models/professor';
import { Funcionario } from '../../../models/funcionario';
import { Turma } from '../../../models/turmas';
import { Disciplina } from '../../../models/disciplina';
import { ProfessorService } from '../../../services/professor.service';
import { FuncionarioService } from '../../../services/funcionario.service';
import { TurmasService } from '../../../services/turmas.service';
import { DisciplinaService } from '../../../services/disciplina.service';

@Component({
  selector: 'app-professoresdetails',
  standalone: true,
  imports: [CommonModule, MdbFormsModule, MdbRippleModule, FormsModule],
  templateUrl: './professoresdetails.component.html',
  styleUrl: './professoresdetails.component.css'
})
export class ProfessoresdetailsComponent implements OnInit {

  professor: Professor = new Professor(null, null);
  funcionarios: Funcionario[] = [];
  turmas: Turma[] = [];
  disciplinas: Disciplina[] = [];

  router = inject(ActivatedRoute);
  router2 = inject(Router);
  professorService = inject(ProfessorService);
  funcionarioService = inject(FuncionarioService);
  turmasService = inject(TurmasService);
  disciplinaService = inject(DisciplinaService);

  compareFuncionarioFn(f1: Funcionario | null, f2: Funcionario | null): boolean {
    return f1 !== null && f2 !== null ? f1.id === f2.id : f1 === f2;
  }

  compareTurmaFn(t1: Turma | null, t2: Turma | null): boolean {
    return t1 !== null && t2 !== null ? t1.id === t2.id : t1 === t2;
  }

  compareDisciplinaFn(d1: Disciplina | null, d2: Disciplina | null): boolean {
    return d1 !== null && d2 !== null ? d1.id === d2.id : d1 === d2;
  }

  constructor() {
    const id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  ngOnInit(): void {
    this.loadFuncionarios();
    this.loadTurmas();
    this.loadDisciplinas();
  }

  loadFuncionarios() {
    this.funcionarioService.findAll().subscribe({
      next: lista => this.funcionarios = lista,
      error: () => Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' })
    });
  }

  loadTurmas() {
    this.turmasService.findAll().subscribe({
      next: lista => this.turmas = lista,
      error: () => Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' })
    });
  }

  loadDisciplinas() {
    this.disciplinaService.findAll().subscribe({
      next: lista => this.disciplinas = lista,
      error: () => Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' })
    });
  }

  findById(id: number) {
    this.professorService.findById(id).subscribe({
      next: ret => this.professor = ret,
      error: () => Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' })
    });
  }

  save() {
    const prof = { ...this.professor } as Professor;
    if (prof.id) {
      this.professorService.update(prof).subscribe({
        next: () => {
          Swal.fire({ title: 'Professor editado com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
          this.router2.navigate(['admin/professores']);
        },
        error: () => {
          Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
        }
      });
    } else {
      delete prof.id;
      this.professorService.save(prof).subscribe({
        next: () => {
          Swal.fire({ title: 'Professor cadastrado com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
          this.router2.navigate(['admin/professores']);
        },
        error: erro => {
          console.error('Erro completo:', erro);
          Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
        }
      });
    }
  }
}
