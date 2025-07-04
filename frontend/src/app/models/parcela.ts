import { Matricula } from './matricula';

export class Parcela {
  id?: number;
  matricula: Matricula | null;
  numero: number;
  valorOriginal: number;
  dataVencimento: Date | null;
  status: string;

  constructor(
    matricula: Matricula | null,
    numero: number,
    valorOriginal: number,
    dataVencimento: Date | null,
    status: string,
    id?: number
  ) {
    this.id = id;
    this.matricula = matricula;
    this.numero = numero;
    this.valorOriginal = valorOriginal;
    this.dataVencimento = dataVencimento;
    this.status = status;
  }
}
