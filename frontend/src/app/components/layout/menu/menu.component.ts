import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  private usuariosService = inject(UsuariosService);
  private router = inject(Router);
  open = false;

  get nomeUsuario(): string {
    return this.usuariosService.getUsuarioLogado()?.nome || '';
  }

  toggleDropdown() {
    this.open = !this.open;
  }

  logout() {
    this.usuariosService.logout();
    this.router.navigate(['/login']);
  }
}
