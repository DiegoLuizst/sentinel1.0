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

  constructor(init?: Partial<Aluno>) {
    Object.assign(this, init);
  }
}
