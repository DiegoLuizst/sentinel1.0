import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-login',
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email!: string;
  senha!: string;

  router = inject(Router);

  logar(){
    if(this.email == 'admin' && this.senha == '123123') {
      this.router.navigate(['admin/turmas']);
    }else{
      alert("Email ou senha incorretos!");
    }
  }

}
