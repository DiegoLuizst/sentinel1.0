import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-redirect',
  standalone: true,
  template: ''
})
export class RedirectComponent {
  private router = inject(Router);
  private usuariosService = inject(UsuariosService);

  ngOnInit() {
    if (this.usuariosService.getToken()) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}

