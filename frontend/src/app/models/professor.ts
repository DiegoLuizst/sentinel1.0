import { Funcionario } from './funcionario';
import { Usuario } from './usuario';
import { Turma } from './turmas';
import { Disciplina } from './disciplina';

export class Professor {
  id?: number;
  funcionario: Funcionario | null;
  usuario: Usuario | null;
  turmas: Turma[];
  disciplinas: Disciplina[];

  constructor(
    funcionario: Funcionario | null,
    usuario: Usuario | null,
    turmas: Turma[] = [],
    disciplinas: Disciplina[] = [],
    id?: number
  ) {
    this.id = id;
    this.funcionario = funcionario;
    this.usuario = usuario;
    this.turmas = turmas;
    this.disciplinas = disciplinas;
  }
}
