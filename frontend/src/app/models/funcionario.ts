import { Cargo } from './cargo';

export class Funcionario {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  admissão: Date | null;
  Demissão: Date | null;
  Status?: string;
  cargo: Cargo | null;

  constructor(
    nome: string,
    email: string,
    telefone: string,
    cpf: string,
    cep: string,
    rua: string,
    numero: string,
    complemento: string,
    bairro: string,
    cidade: string,
    estado: string,
    admissão: Date | null,
    Demissão: Date | null,
    cargo: Cargo | null,
    id?: number,
    Status?: string
  ) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.telefone = telefone;
    this.cpf = cpf;
    this.cep = cep;
    this.rua = rua;
    this.numero = numero;
    this.complemento = complemento;
    this.bairro = bairro;
    this.cidade = cidade;
    this.estado = estado;
    this.admissão = admissão;
    this.Demissão = Demissão;
    this.cargo = cargo;
    this.Status = Status;
  }
}
