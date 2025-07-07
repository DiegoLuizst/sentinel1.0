import { Aluno } from './aluno';
import { Turma } from './turmas';
import { Professor } from './professor';

export class DiarioBordo {
  id?: number;
  data: Date | null;
  anotacao: string;
  aluno: Aluno | null;
  turma: Turma | null;
  professor: Professor | null;

  constructor(
    data: Date | null,
    anotacao: string,
    aluno: Aluno | null,
    turma: Turma | null,
    professor: Professor | null,
    id?: number
  ) {
    this.id = id;
    this.data = data;
    this.anotacao = anotacao;
    this.aluno = aluno;
    this.turma = turma;
    this.professor = professor;
  }
}
