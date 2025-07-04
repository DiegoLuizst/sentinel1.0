import { Aluno } from './aluno';
import { PlanoPagamento } from './plano-pagamento';
import { Turma } from './turmas';

export class Matricula {
  id?: number;
  aluno: Aluno | null;
  planoPagamento: PlanoPagamento | null;
  turma: Turma | null;

  constructor(
    aluno: Aluno | null,
    planoPagamento: PlanoPagamento | null,
    turma: Turma | null,
    id?: number
  ) {
    this.id = id;
    this.aluno = aluno;
    this.planoPagamento = planoPagamento;
    this.turma = turma;
  }
}
