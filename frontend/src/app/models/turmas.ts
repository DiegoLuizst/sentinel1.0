export class Turma {
  id?: number;  // Tornar o ID opcional com ?
  nome: string;
  ano: string;
  turno: string;
  sala: string;
  nivel: string;

  // Construtor modificado para não exigir ID
  constructor(nome: string, ano: string, turno: string, sala: string, nivel: string, id?: number){
    this.id = id;
    this.nome = nome;
    this.ano = ano;
    this.turno = turno;
    this.sala = sala;
    this.nivel = nivel;
  }
}
