export class PlanoPagamento {
  id?: number;
  descricao: string;
  numeroParcelas: number;
  periodicidade: string;
  valorTotal: number;

  constructor(
    descricao: string,
    numeroParcelas: number,
    periodicidade: string,
    valorTotal: number,
    id?: number
  ) {
    this.id = id;
    this.descricao = descricao;
    this.numeroParcelas = numeroParcelas;
    this.periodicidade = periodicidade;
    this.valorTotal = valorTotal;
  }
}
