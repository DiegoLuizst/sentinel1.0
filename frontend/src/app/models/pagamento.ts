import { Parcela } from './parcela';

export class Pagamento {
  id?: number;
  parcela: Parcela | null;
  dataPagamento: Date | null;
  valorPago: number;
  formaPagamento: string;

  constructor(
    parcela: Parcela | null,
    dataPagamento: Date | null,
    valorPago: number,
    formaPagamento: string,
    id?: number
  ) {
    this.id = id;
    this.parcela = parcela;
    this.dataPagamento = dataPagamento;
    this.valorPago = valorPago;
    this.formaPagamento = formaPagamento;
  }
}
