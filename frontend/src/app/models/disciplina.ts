export class Disciplina {
  id?: number;
  nome: string;
  carga_horaria: string;

  constructor(nome: string, carga_horaria: string, id?: number) {
    this.id = id;
    this.nome = nome;
    this.carga_horaria = carga_horaria;
  }
}
