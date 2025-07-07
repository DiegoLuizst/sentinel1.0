import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiarioBordo } from '../models/diario-bordo';

@Injectable({
  providedIn: 'root'
})
export class DiarioBordoService {
  private readonly http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/diarios-bordo';

  findAll(): Observable<DiarioBordo[]> {
    return this.http.get<DiarioBordo[]>(this.API + '/findAll');
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/delete/' + id, { responseType: 'text' as 'json' });
  }

  save(diario: DiarioBordo): Observable<string> {
    return this.http.post<string>(this.API + '/save', diario, { responseType: 'text' as 'json' });
  }

  update(diario: DiarioBordo): Observable<string> {
    return this.http.put<string>(this.API + '/update', diario, { responseType: 'text' as 'json' });
  }

  findById(id: number): Observable<DiarioBordo> {
    return this.http.get<DiarioBordo>(this.API + '/findById/' + id);
  }
}
