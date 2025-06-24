import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PermissaoPagina } from '../models/permissao-pagina';

@Injectable({
  providedIn: 'root'
})
export class PermissaoPaginaService {

  private readonly http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/paginas';

  findAll(): Observable<PermissaoPagina[]> {
    return this.http.get<PermissaoPagina[]>(this.API + '/findAll');
  }

}
