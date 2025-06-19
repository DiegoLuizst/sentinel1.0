import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { TurmaslistComponent } from './components/turmas/turmaslist/turmaslist.component';
import { TurmasdetailsComponent } from './components/turmas/turmasdetails/turmasdetails.component';


export const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: 'full'},
  {path: "login", component: LoginComponent},

  {path: "admin", component: PrincipalComponent, children:[
    {path: "turmas", component: TurmaslistComponent},
    {path: "turmas/new", component: TurmasdetailsComponent},
    {path: "turmas/edit/:id", component: TurmasdetailsComponent}

  ]},


];
