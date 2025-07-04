import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlanoPagamento } from '../models/plano-pagamento';

@Injectable({
  providedIn: 'root'
})
export class PlanoPagamentoService {
  private readonly http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/planos-pagamento';

  findAll(): Observable<PlanoPagamento[]> {
    return this.http.get<PlanoPagamento[]>(this.API + '/findAll');
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/delete/' + id, { responseType: 'text' as 'json' });
  }

  save(plano: PlanoPagamento): Observable<string> {
    return this.http.post<string>(this.API + '/save', plano, { responseType: 'text' as 'json' });
  }

  update(plano: PlanoPagamento): Observable<string> {
    return this.http.put<string>(this.API + '/update', plano, { responseType: 'text' as 'json' });
  }

  findById(id: number): Observable<PlanoPagamento> {
    return this.http.get<PlanoPagamento>(this.API + '/findById/' + id);
  }
}
