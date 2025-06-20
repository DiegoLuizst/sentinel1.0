export class Aluno {
  id?: number;
  nome: string;
  data: Date | null;
  genero: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  telefone: string;
  email: string;
  nome_resp1: string;
  telefone_resp1: string;
  email_resp1: string;
  cpf_resp1: string;
  cep_resp1: string;
  rua_resp1: string;
  numero_resp1: string;
  complemento_resp1: string;
  bairro_resp1: string;
  cidade_resp1: string;
  estado_resp1: string;
  parentesco_resp1: string;
  nome_resp2: string;
  telefone_resp2: string;
  email_resp2: string;
  cpf_resp2: string;
  cep_resp2: string;
  rua_resp2: string;
  numero_resp2: string;
  complemento_resp2: string;
  bairro_resp2: string;
  cidade_resp2: string;
  estado_resp2: string;
  parentesco_resp2: string;
  // turma property not used on creation
  turma?: any;

  constructor(
    nome: string,
    data: Date | null,
    genero: string,
    cep: string,
    rua: string,
    numero: string,
    complemento: string,
    bairro: string,
    cidade: string,
    estado: string,
    telefone: string,
    email: string,
    nome_resp1: string,
    telefone_resp1: string,
    email_resp1: string,
    cpf_resp1: string,
    cep_resp1: string,
    rua_resp1: string,
    numero_resp1: string,
    complemento_resp1: string,
    bairro_resp1: string,
    cidade_resp1: string,
    estado_resp1: string,
    parentesco_resp1: string,
    nome_resp2: string,
    telefone_resp2: string,
    email_resp2: string,
    cpf_resp2: string,
    cep_resp2: string,
    rua_resp2: string,
    numero_resp2: string,
    complemento_resp2: string,
    bairro_resp2: string,
    cidade_resp2: string,
    estado_resp2: string,
    parentesco_resp2: string,
    turma?: any,
    id?: number
  ) {
    this.id = id;
    this.nome = nome;
    this.data = data;
    this.genero = genero;
    this.cep = cep;
    this.rua = rua;
    this.numero = numero;
    this.complemento = complemento;
    this.bairro = bairro;
    this.cidade = cidade;
    this.estado = estado;
    this.telefone = telefone;
    this.email = email;
    this.nome_resp1 = nome_resp1;
    this.telefone_resp1 = telefone_resp1;
    this.email_resp1 = email_resp1;
    this.cpf_resp1 = cpf_resp1;
    this.cep_resp1 = cep_resp1;
    this.rua_resp1 = rua_resp1;
    this.numero_resp1 = numero_resp1;
    this.complemento_resp1 = complemento_resp1;
    this.bairro_resp1 = bairro_resp1;
    this.cidade_resp1 = cidade_resp1;
    this.estado_resp1 = estado_resp1;
    this.parentesco_resp1 = parentesco_resp1;
    this.nome_resp2 = nome_resp2;
    this.telefone_resp2 = telefone_resp2;
    this.email_resp2 = email_resp2;
    this.cpf_resp2 = cpf_resp2;
    this.cep_resp2 = cep_resp2;
    this.rua_resp2 = rua_resp2;
    this.numero_resp2 = numero_resp2;
    this.complemento_resp2 = complemento_resp2;
    this.bairro_resp2 = bairro_resp2;
    this.cidade_resp2 = cidade_resp2;
    this.estado_resp2 = estado_resp2;
    this.parentesco_resp2 = parentesco_resp2;
    this.turma = turma;
  }
}
