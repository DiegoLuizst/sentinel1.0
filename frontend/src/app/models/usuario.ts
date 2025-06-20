import { PermissaoGrupo } from './permissao-grupo';

export class Usuario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  permissaoGrupo: PermissaoGrupo | null;

  constructor(
    nome: string,
    email: string,
    senha: string,
    permissaoGrupo: PermissaoGrupo | null,
    id?: number
  ) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.permissaoGrupo = permissaoGrupo;
  }
}
