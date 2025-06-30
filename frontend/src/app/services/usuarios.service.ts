import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { jwtDecode, JwtPayload } from 'jwt-decode';

import { Usuario } from '../models/usuario';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private readonly http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/usuarios';
  private readonly API_LOGIN = 'http://localhost:8080/api/login';

  private usuarioLogado: Usuario | null = null;

  findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API + '/findAll');
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/delete/' + id, { responseType: 'text' as 'json' });
  }

  save(usuario: Usuario): Observable<string> {
    return this.http.post<string>(this.API + '/save', usuario, { responseType: 'text' as 'json' });
  }

  update(usuario: Usuario): Observable<string> {
    return this.http.put<string>(this.API + '/update', usuario, { responseType: 'text' as 'json' });
  }

  findById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.API + '/findById/' + id);
  }

  login(login: Login): Observable<string> {
    return this.http.post<string>(this.API_LOGIN, login, { responseType: 'text' as 'json' });
  }

  loadUsuarioLogado(): Observable<Usuario> {
    const payload = this.decodeToken() as any;
    const id = payload?.id;
    return this.findById(Number(id)).pipe(
      tap(u => this.setUsuarioLogado(u))
    );
  }

  setUsuarioLogado(usuario: Usuario) {
    this.usuarioLogado = usuario;
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
  }

  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUsuarioLogado(): Usuario | null {
    if (this.usuarioLogado) {
      return this.usuarioLogado;
    }
    const stored = localStorage.getItem('usuarioLogado');
    if (stored) {
      this.usuarioLogado = JSON.parse(stored);
      return this.usuarioLogado;
    }
    return null;
  }

  decodeToken(): JwtPayload | null {
    const token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return null;
  }

  hasRole(role: string) {
    const user = this.decodeToken() as unknown as Usuario;
    if (user.permissaoGrupo == null)
      return true;
    else
      return false;
  }

  hasPermission(rota: string, metodo: string) {
    const usuario = this.getUsuarioLogado();
    const permissoes = usuario?.permissaoGrupo?.permissoes;
    if (!permissoes) {
      return false;
    }
    return permissoes.some(p => rota.startsWith(p.rota) && p.metodoHttp.toUpperCase() === metodo.toUpperCase());
  }
}
