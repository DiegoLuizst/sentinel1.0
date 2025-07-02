import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Disciplina } from '../models/disciplina';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  private readonly http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/disciplinas';

  findAll(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(this.API + '/findAll');
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/delete/' + id, { responseType: 'text' as 'json' });
  }

  save(disciplina: Disciplina): Observable<string> {
    return this.http.post<string>(this.API + '/save', disciplina, { responseType: 'text' as 'json' });
  }

  update(disciplina: Disciplina): Observable<string> {
    return this.http.put<string>(this.API + '/update', disciplina, { responseType: 'text' as 'json' });
  }

  findById(id: number): Observable<Disciplina> {
    return this.http.get<Disciplina>(this.API + '/findById/' + id);
  }
}
