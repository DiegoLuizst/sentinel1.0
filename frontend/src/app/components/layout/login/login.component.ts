import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { LoginService } from '../../../auth/login.service';
import { Login } from '../../../auth/login';

@Component({
  selector: 'app-login',
  imports: [MdbFormsModule, MdbRippleModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login: Login = new Login;

  router = inject(Router);
  loginService = inject(LoginService);

  logar(){

    this.loginService.logar(this.login).subscribe({

      next: token => {

        if(token){
          this.loginService.addToken(token);
        }else{
          alert('Email ou senha incorretos!')
        }

      },
      error: erro => {
        alert('ERRO');

      }

    });

  }

}
