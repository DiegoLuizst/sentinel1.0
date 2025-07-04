import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagamento } from '../models/pagamento';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {
  private readonly http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/pagamentos';

  findAll(): Observable<Pagamento[]> {
    return this.http.get<Pagamento[]>(this.API + '/findAll');
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/delete/' + id, { responseType: 'text' as 'json' });
  }

  save(pagamento: Pagamento): Observable<string> {
    return this.http.post<string>(this.API + '/save', pagamento, { responseType: 'text' as 'json' });
  }

  update(pagamento: Pagamento): Observable<string> {
    return this.http.put<string>(this.API + '/update', pagamento, { responseType: 'text' as 'json' });
  }

  findById(id: number): Observable<Pagamento> {
    return this.http.get<Pagamento>(this.API + '/findById/' + id);
  }
}
