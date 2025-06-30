import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../../services/usuarios.service';
import { Login } from '../../../models/login';

@Component({
  selector: 'app-login',
  imports: [MdbFormsModule, MdbRippleModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login: Login = new Login;

  router = inject(Router);
  usuariosService = inject(UsuariosService);

  logar(){
    this.usuariosService.login(this.login).subscribe({
      next: token => {
        if(token){
          this.usuariosService.addToken(token);
          this.usuariosService.loadUsuarioLogado().subscribe({
            next: () => this.router.navigate(['/admin/turmas'])
          });
        }
      },
      error: erro => {
        if (erro.status === 401) {
          Swal.fire({ title: 'Usuário ou senha incorretos!', icon: 'error', confirmButtonText: 'Ok' });
        } else {
          Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
        }
      }
    });

  }

}
