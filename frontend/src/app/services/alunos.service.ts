import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from '../models/aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  private readonly http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/alunos';

  findAll(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.API + '/findAll');
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/delete/' + id, { responseType: 'text' as 'json' });
  }

  save(aluno: Aluno): Observable<string> {
    return this.http.post<string>(this.API + '/save', aluno, { responseType: 'text' as 'json' });
  }

  update(aluno: Aluno): Observable<string> {
    return this.http.put<string>(this.API + '/update', aluno, { responseType: 'text' as 'json' });
  }

  upload(id: number, files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach(f => formData.append('files', f));
    return this.http.post(this.API + '/upload/' + id, formData);
  }

  findById(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(this.API + '/findById/' + id);
  }
}
