import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { TurmaslistComponent } from './components/turmas/turmaslist/turmaslist.component';
import { TurmasdetailsComponent } from './components/turmas/turmasdetails/turmasdetails.component';
import { AlunoslistComponent } from './components/alunos/alunoslist/alunoslist.component';
import { AlunosdetailsComponent } from './components/alunos/alunosdetails/alunosdetails.component';
import { UsuarioslistComponent } from './components/usuarios/usuarioslist/usuarioslist.component';
import { UsuariosdetailsComponent } from './components/usuarios/usuariosdetails/usuariosdetails.component';
import { PermissaoGrupoListComponent } from './components/permissao-grupo/permissao-grupo-list/permissao-grupo-list.component';
import { PermissaoGrupoDetailsComponent } from './components/permissao-grupo/permissao-grupo-details/permissao-grupo-details.component';
import { HomeComponent } from './components/home/home.component';
import { RedirectComponent } from './components/layout/redirect/redirect.component';


export const routes: Routes = [
  { path: '', component: RedirectComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: PrincipalComponent, children: [
    { path: '', component: HomeComponent }
  ]},
  {path: "admin", component: PrincipalComponent, children:[
    {path: "turmas", component: TurmaslistComponent},
    {path: "turmas/new", component: TurmasdetailsComponent},
    {path: "turmas/edit/:id", component: TurmasdetailsComponent},
    {path: "alunos", component: AlunoslistComponent},
    {path: "alunos/new", component: AlunosdetailsComponent},
    {path: "alunos/edit/:id", component: AlunosdetailsComponent},
    {path: "usuarios", component: UsuarioslistComponent},
    {path: "usuarios/new", component: UsuariosdetailsComponent},
    {path: "usuarios/edit/:id", component: UsuariosdetailsComponent},
    {path: "permissao", component: PermissaoGrupoListComponent},
    {path: "permissao/new", component: PermissaoGrupoDetailsComponent},
    {path: "permissao/edit/:id", component: PermissaoGrupoDetailsComponent}

  ]},
  { path: '**', redirectTo: '' }
];
