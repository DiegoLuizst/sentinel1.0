import { Professor } from './professor';
import { Turma } from './turmas';
import { Disciplina } from './disciplina';
import { Aluno } from './aluno';

export class DiarioClasse {
  id?: number;
  data: Date | null;
  tipo: string;
  valor: number | null;
  observacao: string;
  professor: Professor | null;
  turma: Turma | null;
  disciplina: Disciplina | null;
  aluno: Aluno | null;

  constructor(
    data: Date | null,
    tipo: string,
    valor: number | null,
    observacao: string,
    professor: Professor | null,
    turma: Turma | null,
    disciplina: Disciplina | null,
    aluno: Aluno | null,
    id?: number
  ) {
    this.id = id;
    this.data = data;
    this.tipo = tipo;
    this.valor = valor;
    this.observacao = observacao;
    this.professor = professor;
    this.turma = turma;
    this.disciplina = disciplina;
    this.aluno = aluno;
  }
}
