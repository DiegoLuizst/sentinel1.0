import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
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

  getUsuarioLogado() {
    return this.decodeToken() as unknown as Usuario;
  }
}
