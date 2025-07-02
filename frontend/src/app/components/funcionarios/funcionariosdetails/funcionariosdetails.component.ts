import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { HttpClient } from '@angular/common/http';
import { Funcionario } from '../../../models/funcionario';
import { Cargo } from '../../../models/cargo';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FuncionarioService } from '../../../services/funcionario.service';
import { CargoService } from '../../../services/cargo.service';

@Component({
  selector: 'app-funcionariosdetails',
  standalone: true,
  imports: [MdbFormsModule, MdbRippleModule, FormsModule],
  templateUrl: './funcionariosdetails.component.html',
  styleUrl: './funcionariosdetails.component.css'
})
export class FuncionariosdetailsComponent implements OnInit {

  funcionario: Funcionario = new Funcionario('', '', '', '', '', '', '', '', '', '', '', null, null, null);
  cargos: Cargo[] = [];
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  funcionarioService = inject(FuncionarioService);
  cargoService = inject(CargoService);
  http = inject(HttpClient);

  /**
   * Função utilizada para comparar cargos no select de cargos.
   * Necessária para exibir o cargo corretamente ao editar um funcionário.
   */
  compareCargoFn(c1: Cargo | null, c2: Cargo | null): boolean {
    return c1 !== null && c2 !== null ? c1.id === c2.id : c1 === c2;
  }

  constructor(){
    const id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }
  }

  ngOnInit(): void {
    this.loadCargos();
  }

  loadCargos(){
    this.cargoService.findAll().subscribe({
      next: lista => this.cargos = lista,
      error: () => Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' })
    });
  }

  buscarCep(){
    const cepLimpo = this.funcionario.cep?.replace(/\D/g, '');
    if(cepLimpo && cepLimpo.length === 8){
      this.http.get<any>(`https://viacep.com.br/ws/${cepLimpo}/json/`).subscribe(d => {
        if(!d.erro){
          this.funcionario.rua = d.logradouro;
          this.funcionario.bairro = d.bairro;
          this.funcionario.cidade = d.localidade;
          this.funcionario.estado = d.uf;
        }
      });
    }
  }

  findById(id: number){
    this.funcionarioService.findById(id).subscribe({
      next: ret => { this.funcionario = ret; },
      error: () => {
        Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
      }
    });
  }

  save(){
    if(this.funcionario.id){
      this.funcionarioService.update(this.funcionario).subscribe({
        next: () => {
          Swal.fire({ title: 'Funcionário editado com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
          this.router2.navigate(['admin/funcionarios']);
        },
        error: () => {
          Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
        }
      });
    } else {
      const funcParaSalvar = {...this.funcionario};
      delete funcParaSalvar.id;
      this.funcionarioService.save(funcParaSalvar).subscribe({
        next: () => {
          Swal.fire({ title: 'Funcionário cadastrado com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
          this.router2.navigate(['admin/funcionarios']);
        },
        error: erro => {
          console.error('Erro completo:', erro);
          Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
        }
      });
    }
  }
}
