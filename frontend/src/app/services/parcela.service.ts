import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parcela } from '../models/parcela';

@Injectable({
  providedIn: 'root'
})
export class ParcelaService {
  private readonly http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/parcelas';

  findAll(): Observable<Parcela[]> {
    return this.http.get<Parcela[]>(this.API + '/findAll');
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/delete/' + id, { responseType: 'text' as 'json' });
  }

  save(parcela: Parcela): Observable<string> {
    return this.http.post<string>(this.API + '/save', parcela, { responseType: 'text' as 'json' });
  }

  update(parcela: Parcela): Observable<string> {
    return this.http.put<string>(this.API + '/update', parcela, { responseType: 'text' as 'json' });
  }

  findById(id: number): Observable<Parcela> {
    return this.http.get<Parcela>(this.API + '/findById/' + id);
  }
}
