import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { TurmaslistComponent } from './components/turmas/turmaslist/turmaslist.component';
import { TurmasdetailsComponent } from './components/turmas/turmasdetails/turmasdetails.component';
import { AlunoslistComponent } from './components/alunos/alunoslist/alunoslist.component';
import { AlunosdetailsComponent } from './components/alunos/alunosdetails/alunosdetails.component';


export const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: 'full'},
  {path: "login", component: LoginComponent},

  {path: "admin", component: PrincipalComponent, children:[
    {path: "turmas", component: TurmaslistComponent},
    {path: "turmas/new", component: TurmasdetailsComponent},
    {path: "turmas/edit/:id", component: TurmasdetailsComponent},
    {path: "alunos", component: AlunoslistComponent},
    {path: "alunos/new", component: AlunosdetailsComponent},
    {path: "alunos/edit/:id", component: AlunosdetailsComponent}

  ]},


];
