import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LancamentoFinanceiro } from '../models/lancamento-financeiro';

@Injectable({
  providedIn: 'root'
})
export class LancamentoFinanceiroService {
  private readonly http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/lancamentos-financeiros';

  findAll(): Observable<LancamentoFinanceiro[]> {
    return this.http.get<LancamentoFinanceiro[]>(this.API + '/findAll');
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/delete/' + id, { responseType: 'text' as 'json' });
  }

  save(lancamento: LancamentoFinanceiro): Observable<string> {
    return this.http.post<string>(this.API + '/save', lancamento, { responseType: 'text' as 'json' });
  }

  update(lancamento: LancamentoFinanceiro): Observable<string> {
    return this.http.put<string>(this.API + '/update', lancamento, { responseType: 'text' as 'json' });
  }

  findById(id: number): Observable<LancamentoFinanceiro> {
    return this.http.get<LancamentoFinanceiro>(this.API + '/findById/' + id);
  }
}
