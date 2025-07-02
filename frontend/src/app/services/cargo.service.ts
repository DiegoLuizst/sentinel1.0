import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cargo } from '../models/cargo';

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  private readonly http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/cargos';

  findAll(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.API + '/findAll');
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(this.API + '/delete/' + id, { responseType: 'text' as 'json' });
  }

  save(cargo: Cargo): Observable<string> {
    return this.http.post<string>(this.API + '/save', cargo, { responseType: 'text' as 'json' });
  }

  update(cargo: Cargo): Observable<string> {
    return this.http.put<string>(this.API + '/update', cargo, { responseType: 'text' as 'json' });
  }

  findById(id: number): Observable<Cargo> {
    return this.http.get<Cargo>(this.API + '/findById/' + id);
  }
}
