import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private readonly http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/funcionarios';

  findAll(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.API + '/findAll');
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/delete/' + id, { responseType: 'text' as 'json' });
  }

  save(funcionario: Funcionario): Observable<string> {
    return this.http.post<string>(this.API + '/save', funcionario, { responseType: 'text' as 'json' });
  }

  update(funcionario: Funcionario): Observable<string> {
    return this.http.put<string>(this.API + '/update', funcionario, { responseType: 'text' as 'json' });
  }

  findById(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(this.API + '/findById/' + id);
  }
}
