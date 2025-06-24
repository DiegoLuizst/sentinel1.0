import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from 'jwt-decode';


import { Login } from './login';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);
  API = "http://localhost:8080/api/login";


  constructor() { }


  logar(login: Login): Observable<string> {
    return this.http.post<string>(this.API, login, {responseType: 'text' as 'json'});
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
