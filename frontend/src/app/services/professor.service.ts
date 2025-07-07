import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from '../models/professor';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private readonly http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/professores';

  findAll(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.API + '/findAll');
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/delete/' + id, { responseType: 'text' as 'json' });
  }

  save(professor: Professor): Observable<string> {
    return this.http.post<string>(this.API + '/save', professor, { responseType: 'text' as 'json' });
  }

  update(professor: Professor): Observable<string> {
    return this.http.put<string>(this.API + '/update', professor, { responseType: 'text' as 'json' });
  }

  findById(id: number): Observable<Professor> {
    return this.http.get<Professor>(this.API + '/findById/' + id);
  }
}
