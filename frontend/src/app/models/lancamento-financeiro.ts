export class LancamentoFinanceiro {
  id?: number;
  data: Date | null;
  saldoDiario: number;
  saldoMensal: number;

  constructor(
    data: Date | null,
    saldoDiario: number,
    saldoMensal: number,
    id?: number
  ) {
    this.id = id;
    this.data = data;
    this.saldoDiario = saldoDiario;
    this.saldoMensal = saldoMensal;
  }
}
