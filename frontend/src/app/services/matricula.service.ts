import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matricula } from '../models/matricula';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {
  private readonly http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/matriculas';

  findAll(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(this.API + '/findAll');
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/delete/' + id, { responseType: 'text' as 'json' });
  }

  save(matricula: Matricula): Observable<string> {
    return this.http.post<string>(this.API + '/save', matricula, { responseType: 'text' as 'json' });
  }

  update(matricula: Matricula): Observable<string> {
    return this.http.put<string>(this.API + '/update', matricula, { responseType: 'text' as 'json' });
  }

  findById(id: number): Observable<Matricula> {
    return this.http.get<Matricula>(this.API + '/findById/' + id);
  }
}
