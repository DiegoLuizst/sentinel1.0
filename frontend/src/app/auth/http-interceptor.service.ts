import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const meuhttpInterceptor: HttpInterceptorFn = (request, next) => {

  let router = inject(Router);

  let token = localStorage.getItem('token');
  
  console.log('entrou aqui 1');
  if (token && !router.url.includes('/login')) {
    request = request.clone({
      setHeaders: { Authorization: 'Bearer ' + token },
    });
  }

  return next(request).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        console.log('entrou aqui 2');
        
        if (err.status === 401) {
          if (router.url.includes('/login')) {
            Swal.fire({ title: 'Usuário ou senha incorretos!', icon: 'error', confirmButtonText: 'Ok' });
          } else {
            Swal.fire({ title: 'Sessão expirada!', icon: 'error', confirmButtonText: 'Ok' });
            router.navigate(['/login']);
          }
        } else if (err.status === 403) {
          Swal.fire({ title: 'Acesso negado!', icon: 'error', confirmButtonText: 'Ok' });
          router.navigate(['/login']);
        } else {
          console.error('HTTP error:', err);
        }


      } else {
        console.error('An error occurred:', err);
      }

      return throwError(() => err);
    })
  );
};
