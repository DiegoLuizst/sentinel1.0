export class PermissaoPagina {
  id?: number;
  nome: string;
  rota: string;
  metodoHttp: string;

  constructor(nome: string, rota: string, metodoHttp: string, id?: number) {
    this.id = id;
    this.nome = nome;
    this.rota = rota;
    this.metodoHttp = metodoHttp;
  }
}
