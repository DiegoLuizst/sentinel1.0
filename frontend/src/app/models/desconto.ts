import { Parcela } from './parcela';
import { Pagamento } from './pagamento';

export class Desconto {
  id?: number;
  parcela: Parcela | null;
  pagamento: Pagamento | null;
  valor: number;
  motivo: string;

  constructor(
    parcela: Parcela | null,
    pagamento: Pagamento | null,
    valor: number,
    motivo: string,
    id?: number
  ) {
    this.id = id;
    this.parcela = parcela;
    this.pagamento = pagamento;
    this.valor = valor;
    this.motivo = motivo;
  }
}
