import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private readonly http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/usuarios';

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
}
