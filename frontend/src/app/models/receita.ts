export class Receita {
  id?: number;
  descricao: string;
  valor: number;
  data: Date | null;
  categoria: string;

  constructor(
    descricao: string,
    valor: number,
    data: Date | null,
    categoria: string,
    id?: number
  ) {
    this.id = id;
    this.descricao = descricao;
    this.valor = valor;
    this.data = data;
    this.categoria = categoria;
  }
}
