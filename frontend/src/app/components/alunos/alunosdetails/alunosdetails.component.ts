import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Aluno } from '../../../models/aluno';
import { AlunosService } from '../../../services/alunos.service';
import { HttpClient } from '@angular/common/http';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM/YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MM/YYYY'
  }
};

@Component({
  selector: 'app-alunosdetails',
  standalone: true,
  imports: [CommonModule, MdbFormsModule, FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './alunosdetails.component.html',
  styleUrl: './alunosdetails.component.css',
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }]
})
export class AlunosdetailsComponent {
  aluno: Aluno = new Aluno(
    '',
    null,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    undefined,
    undefined
  );
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  alunosService = inject(AlunosService);
  http = inject(HttpClient);

  mesmoEnderecoResp1 = false;
  mesmoTelefoneResp1 = false;
  mesmoEmailResp1 = false;

  mesmoEnderecoResp2 = false;
  mesmoTelefoneResp2 = false;
  mesmoEmailResp2 = false;

  semResponsavel2 = false;

  generos = ['Masculino', 'Feminino', 'Não Binário', 'Prefere não informar'];
  parentescos = ['Pai', 'Mãe', 'Responsável Legal', 'Avô/Avó', 'Tio/Tia'];

  buscarCepAluno() {
    this.buscarCep(this.aluno.cep, 'aluno');
  }

  buscarCepResp1() {
    this.buscarCep(this.aluno.cep_resp1, 'resp1');
  }

  buscarCepResp2() {
    this.buscarCep(this.aluno.cep_resp2, 'resp2');
  }

  private buscarCep(cep: string, alvo: 'aluno' | 'resp1' | 'resp2') {
    const cepLimpo = cep?.replace(/\D/g, '');
    if (cepLimpo && cepLimpo.length === 8) {
      this.http.get<any>(`https://viacep.com.br/ws/${cepLimpo}/json/`).subscribe(d => {
        if (!d.erro) {
          if (alvo === 'aluno') {
            this.aluno.rua = d.logradouro;
            this.aluno.bairro = d.bairro;
            this.aluno.cidade = d.localidade;
            this.aluno.estado = d.uf;
          } else if (alvo === 'resp1') {
            this.aluno.rua_resp1 = d.logradouro;
            this.aluno.bairro_resp1 = d.bairro;
            this.aluno.cidade_resp1 = d.localidade;
            this.aluno.estado_resp1 = d.uf;
          } else {
            this.aluno.rua_resp2 = d.logradouro;
            this.aluno.bairro_resp2 = d.bairro;
            this.aluno.cidade_resp2 = d.localidade;
            this.aluno.estado_resp2 = d.uf;
          }
        }
      });
    }
  }

  atualizarEnderecoResp1() {
    if (this.mesmoEnderecoResp1) {
      this.aluno.cep_resp1 = this.aluno.cep;
      this.aluno.rua_resp1 = this.aluno.rua;
      this.aluno.numero_resp1 = this.aluno.numero;
      this.aluno.complemento_resp1 = this.aluno.complemento;
      this.aluno.bairro_resp1 = this.aluno.bairro;
      this.aluno.cidade_resp1 = this.aluno.cidade;
      this.aluno.estado_resp1 = this.aluno.estado;
    }
  }

  atualizarTelefoneResp1() {
    if (this.mesmoTelefoneResp1) {
      this.aluno.telefone_resp1 = this.aluno.telefone;
    }
  }

  atualizarEmailResp1() {
    if (this.mesmoEmailResp1) {
      this.aluno.email_resp1 = this.aluno.email;
    }
  }

  atualizarEnderecoResp2() {
    if (this.mesmoEnderecoResp2) {
      this.aluno.cep_resp2 = this.aluno.cep;
      this.aluno.rua_resp2 = this.aluno.rua;
      this.aluno.numero_resp2 = this.aluno.numero;
      this.aluno.complemento_resp2 = this.aluno.complemento;
      this.aluno.bairro_resp2 = this.aluno.bairro;
      this.aluno.cidade_resp2 = this.aluno.cidade;
      this.aluno.estado_resp2 = this.aluno.estado;
    }
  }

  atualizarTelefoneResp2() {
    if (this.mesmoTelefoneResp2) {
      this.aluno.telefone_resp2 = this.aluno.telefone;
    }
  }

  atualizarEmailResp2() {
    if (this.mesmoEmailResp2) {
      this.aluno.email_resp2 = this.aluno.email;
    }
  }

  toggleResponsavel2() {
    if (this.semResponsavel2) {
      this.aluno.nome_resp2 = '';
      this.aluno.telefone_resp2 = '';
      this.aluno.email_resp2 = '';
      this.aluno.cpf_resp2 = '';
      this.aluno.cep_resp2 = '';
      this.aluno.rua_resp2 = '';
      this.aluno.numero_resp2 = '';
      this.aluno.complemento_resp2 = '';
      this.aluno.bairro_resp2 = '';
      this.aluno.cidade_resp2 = '';
      this.aluno.estado_resp2 = '';
      this.aluno.parentesco_resp2 = '';
    }
  }

  constructor() {
    const id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.alunosService.findById(id).subscribe({
      next: retorno => {
        this.aluno = retorno;
      },
      error: () => {
        Swal.fire({
          title: 'Ocorreu um erro!',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  save() {
    if (this.aluno.id) {
      this.alunosService.update(this.aluno).subscribe({
        next: () => {
          Swal.fire({
            title: 'Aluno editado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(['admin/alunos'], { state: { alunoEditado: this.aluno } });
        },
        error: () => {
          Swal.fire({
            title: 'Ocorreu um erro!',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
    } else {
      const alunoParaSalvar = { ...this.aluno };
      delete alunoParaSalvar.id;
      this.alunosService.save(alunoParaSalvar).subscribe({
        next: () => {
          Swal.fire({
            title: 'Aluno cadastrado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(['admin/alunos'], { state: { alunoNovo: this.aluno } });
        },
        error: (erro) => {
          console.error('Erro completo:', erro);
          Swal.fire({
            title: 'Ocorreu um erro!',
            text: `Status: ${erro.status} - ${erro.statusText || 'Sem mensagem'}`,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
    }
  }
}
