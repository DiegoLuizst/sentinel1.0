import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Desconto } from '../models/desconto';

@Injectable({
  providedIn: 'root'
})
export class DescontoService {
  private readonly http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/descontos';

  findAll(): Observable<Desconto[]> {
    return this.http.get<Desconto[]>(this.API + '/findAll');
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/delete/' + id, { responseType: 'text' as 'json' });
  }

  save(desconto: Desconto): Observable<string> {
    return this.http.post<string>(this.API + '/save', desconto, { responseType: 'text' as 'json' });
  }

  update(desconto: Desconto): Observable<string> {
    return this.http.put<string>(this.API + '/update', desconto, { responseType: 'text' as 'json' });
  }

  findById(id: number): Observable<Desconto> {
    return this.http.get<Desconto>(this.API + '/findById/' + id);
  }
}
