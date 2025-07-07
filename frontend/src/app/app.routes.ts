import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { TurmaslistComponent } from './components/turmas/turmaslist/turmaslist.component';
import { TurmasdetailsComponent } from './components/turmas/turmasdetails/turmasdetails.component';
import { AlunoslistComponent } from './components/alunos/alunoslist/alunoslist.component';
import { AlunosdetailsComponent } from './components/alunos/alunosdetails/alunosdetails.component';
import { UsuarioslistComponent } from './components/usuarios/usuarioslist/usuarioslist.component';
import { UsuariosdetailsComponent } from './components/usuarios/usuariosdetails/usuariosdetails.component';
import { CargoslistComponent } from './components/cargos/cargoslist/cargoslist.component';
import { CargosdetailsComponent } from './components/cargos/cargosdetails/cargosdetails.component';
import { DisciplinaslistComponent } from './components/disciplinas/disciplinaslist/disciplinaslist.component';
import { DisciplinasdetailsComponent } from './components/disciplinas/disciplinasdetails/disciplinasdetails.component';
import { FuncionarioslistComponent } from './components/funcionarios/funcionarioslist/funcionarioslist.component';
import { FuncionariosdetailsComponent } from './components/funcionarios/funcionariosdetails/funcionariosdetails.component';
import { ProfessoreslistComponent } from './components/professores/professoreslist/professoreslist.component';
import { ProfessoresdetailsComponent } from './components/professores/professoresdetails/professoresdetails.component';
import { PermissaoGrupoListComponent } from './components/permissao-grupo/permissao-grupo-list/permissao-grupo-list.component';
import { PermissaoGrupoDetailsComponent } from './components/permissao-grupo/permissao-grupo-details/permissao-grupo-details.component';
import { HomeComponent } from './components/home/home.component';
import { RedirectComponent } from './components/layout/redirect/redirect.component';
import { MatriculaslistComponent } from './components/matriculas/matriculaslist/matriculaslist.component';
import { MatriculasdetailsComponent } from './components/matriculas/matriculasdetails/matriculasdetails.component';
import { PlanoslistComponent } from './components/financeiro/planos/planoslist.component';
import { PlanosdetailsComponent } from './components/financeiro/planos/planosdetails.component';
import { ParcelaslistComponent } from './components/financeiro/parcelas/parcelaslist.component';
import { ParcelasdetailsComponent } from './components/financeiro/parcelas/parcelasdetails/parcelasdetails.component';
import { PagamentoslistComponent } from './components/financeiro/pagamentos/pagamentoslist.component';
import { PagamentosdetailsComponent } from './components/financeiro/pagamentos/pagamentosdetails.component';
import { ReceitasDespesasComponent } from './components/financeiro/receitas-despesas/receitas-despesas.component';
import { ReceitasDespesasdetailsComponent } from './components/financeiro/receitas-despesas/receitas-despesasdetails.component';
import { CaixalistComponent } from './components/financeiro/caixa/caixalist.component';
import { DescontoslistComponent } from './components/financeiro/descontos/descontoslist.component';
import { DescontosdetailsComponent } from './components/financeiro/descontos/descontosdetails.component';
import { DiarioClasseListComponent } from './components/diario-classe/diario-classe-list/diario-classe-list.component';
import { DiarioClasseFormComponent } from './components/diario-classe/diario-classe-form/diario-classe-form.component';
import { DiarioBordoListComponent } from './components/diario-bordo/diario-bordo-list/diario-bordo-list.component';
import { DiarioBordoFormComponent } from './components/diario-bordo/diario-bordo-form/diario-bordo-form.component';


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
    {path: "cargos", component: CargoslistComponent},
    {path: "cargos/new", component: CargosdetailsComponent},
    {path: "cargos/edit/:id", component: CargosdetailsComponent},
    {path: "disciplinas", component: DisciplinaslistComponent},
    {path: "disciplinas/new", component: DisciplinasdetailsComponent},
    {path: "disciplinas/edit/:id", component: DisciplinasdetailsComponent},
    {path: "funcionarios", component: FuncionarioslistComponent},
    {path: "funcionarios/new", component: FuncionariosdetailsComponent},
    {path: "funcionarios/edit/:id", component: FuncionariosdetailsComponent},
    {path: "professores", component: ProfessoreslistComponent},
    {path: "professores/new", component: ProfessoresdetailsComponent},
    {path: "professores/edit/:id", component: ProfessoresdetailsComponent},
    {path: "permissao", component: PermissaoGrupoListComponent},
    {path: "permissao/new", component: PermissaoGrupoDetailsComponent},
    {path: "permissao/edit/:id", component: PermissaoGrupoDetailsComponent},
    {path: "matriculas", component: MatriculaslistComponent},
    {path: "matriculas/new", component: MatriculasdetailsComponent},
    {path: "matriculas/edit/:id", component: MatriculasdetailsComponent},
    {path: "planos", component: PlanoslistComponent},
    {path: "planos/new", component: PlanosdetailsComponent},
    {path: "planos/edit/:id", component: PlanosdetailsComponent},
    {path: "parcelas", component: ParcelaslistComponent},
    {path: "parcelas/edit/:id", component: ParcelasdetailsComponent},
    {path: "pagamentos", component: PagamentoslistComponent},
    {path: "receitas-despesas", component: ReceitasDespesasComponent},
    {path: "receitas-despesas/new", component: ReceitasDespesasdetailsComponent},
    {path: "caixa", component: CaixalistComponent},
    {path: "descontos", component: DescontoslistComponent},
    {path: "descontos/new", component: DescontosdetailsComponent},
    {path: "descontos/edit/:id", component: DescontosdetailsComponent},
    {path: "diario-classe", component: DiarioClasseListComponent},
    {path: "diario-classe/new", component: DiarioClasseFormComponent},
    {path: "diario-classe/edit/:id", component: DiarioClasseFormComponent},
    {path: "diario-bordo", component: DiarioBordoListComponent},
    {path: "diario-bordo/new", component: DiarioBordoFormComponent},
    {path: "diario-bordo/edit/:id", component: DiarioBordoFormComponent}

  ]},
  { path: '**', redirectTo: '' }
];
