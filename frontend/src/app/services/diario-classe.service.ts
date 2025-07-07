import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiarioClasse } from '../models/diario-classe';

@Injectable({
  providedIn: 'root'
})
export class DiarioClasseService {
  private readonly http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/diarios-classe';

  findAll(): Observable<DiarioClasse[]> {
    return this.http.get<DiarioClasse[]>(this.API + '/findAll');
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/delete/' + id, { responseType: 'text' as 'json' });
  }

  save(diario: DiarioClasse): Observable<string> {
    return this.http.post<string>(this.API + '/save', diario, { responseType: 'text' as 'json' });
  }

  update(diario: DiarioClasse): Observable<string> {
    return this.http.put<string>(this.API + '/update', diario, { responseType: 'text' as 'json' });
  }

  findById(id: number): Observable<DiarioClasse> {
    return this.http.get<DiarioClasse>(this.API + '/findById/' + id);
  }
}
