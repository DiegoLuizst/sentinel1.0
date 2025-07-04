import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Despesa } from '../models/despesa';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {
  private readonly http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/despesas';

  findAll(): Observable<Despesa[]> {
    return this.http.get<Despesa[]>(this.API + '/findAll');
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/delete/' + id, { responseType: 'text' as 'json' });
  }

  save(despesa: Despesa): Observable<string> {
    return this.http.post<string>(this.API + '/save', despesa, { responseType: 'text' as 'json' });
  }

  update(despesa: Despesa): Observable<string> {
    return this.http.put<string>(this.API + '/update', despesa, { responseType: 'text' as 'json' });
  }

  findById(id: number): Observable<Despesa> {
    return this.http.get<Despesa>(this.API + '/findById/' + id);
  }
}
