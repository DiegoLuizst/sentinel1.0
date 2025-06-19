import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Turma } from '../models/turmas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurmasService {

  private readonly http = inject(HttpClient);

  private readonly API = "http://localhost:8080/turmas";

  constructor() { }

  findAll(): Observable<Turma[]>{
    return this.http.get<Turma[]>(this.API+"/findAll");

  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});

  }

  save(turma: Turma): Observable<string> {
    return this.http.post<string>(this.API+"/save", turma, {responseType: 'text' as 'json'});

}

  update(turma: Turma): Observable<string>{
    return this.http.put<string>(this.API+"/update", turma, {responseType: 'text' as 'json'});

  }

  findById(id: number): Observable<Turma>{
    return this.http.get<Turma>(this.API+"/findById/"+id);

  }

}
