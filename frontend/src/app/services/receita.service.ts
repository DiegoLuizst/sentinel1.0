import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receita } from '../models/receita';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {
  private readonly http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/receitas';

  findAll(): Observable<Receita[]> {
    return this.http.get<Receita[]>(this.API + '/findAll');
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/delete/' + id, { responseType: 'text' as 'json' });
  }

  save(receita: Receita): Observable<string> {
    return this.http.post<string>(this.API + '/save', receita, { responseType: 'text' as 'json' });
  }

  update(receita: Receita): Observable<string> {
    return this.http.put<string>(this.API + '/update', receita, { responseType: 'text' as 'json' });
  }

  findById(id: number): Observable<Receita> {
    return this.http.get<Receita>(this.API + '/findById/' + id);
  }
}
