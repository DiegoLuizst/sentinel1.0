import { PermissaoPagina } from './permissao-pagina';

export class PermissaoGrupo {
  id?: number;
  nome: string;
  permissoes: PermissaoPagina[];

  constructor(nome: string, id?: number, permissoes: PermissaoPagina[] = []) {
    this.id = id;
    this.nome = nome;
    this.permissoes = permissoes;
  }
}
