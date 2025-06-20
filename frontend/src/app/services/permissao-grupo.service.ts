import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PermissaoGrupo } from '../models/permissao-grupo';

@Injectable({
  providedIn: 'root'
})
export class PermissaoGrupoService {

  private readonly http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/permissao';

  findAll(): Observable<PermissaoGrupo[]> {
    return this.http.get<PermissaoGrupo[]>(this.API + '/findAll');
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/delete/' + id, { responseType: 'text' as 'json' });
  }

  save(pg: PermissaoGrupo): Observable<string> {
    return this.http.post<string>(this.API + '/save', pg, { responseType: 'text' as 'json' });
  }

  update(pg: PermissaoGrupo): Observable<string> {
    return this.http.put<string>(this.API + '/update', pg, { responseType: 'text' as 'json' });
  }

  findById(id: number): Observable<PermissaoGrupo> {
    return this.http.get<PermissaoGrupo>(this.API + '/findById/' + id);
  }
}
