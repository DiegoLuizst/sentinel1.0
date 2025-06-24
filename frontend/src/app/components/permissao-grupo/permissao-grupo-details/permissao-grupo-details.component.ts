import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PermissaoGrupo } from '../../../models/permissao-grupo';
import { PermissaoPagina } from '../../../models/permissao-pagina';
import { PermissaoGrupoService } from '../../../services/permissao-grupo.service';
import { PermissaoPaginaService } from '../../../services/permissao-pagina.service';

@Component({
  selector: 'app-permissao-grupo-details',
  standalone: true,
  imports: [MdbFormsModule, MdbRippleModule, FormsModule],
  templateUrl: './permissao-grupo-details.component.html',
  styleUrl: './permissao-grupo-details.component.css'
})
export class PermissaoGrupoDetailsComponent implements OnInit {

  grupo: PermissaoGrupo = new PermissaoGrupo('');
  permissoesPagina: PermissaoPagina[] = [];
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  pgService = inject(PermissaoGrupoService);
  ppService = inject(PermissaoPaginaService);

  constructor() {
    const id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  ngOnInit(): void {
    this.loadPermissoesPagina();
  }

  loadPermissoesPagina() {
    this.ppService.findAll().subscribe({
      next: lista => { this.permissoesPagina = lista; },
      error: () => {
        Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
      }
    });
  }

  togglePermissao(perm: PermissaoPagina, checked: boolean) {
    if (checked) {
      if (!this.grupo.permissoes) {
        this.grupo.permissoes = [];
      }
      if (!this.grupo.permissoes.find(p => p.id === perm.id)) {
        this.grupo.permissoes.push(perm);
      }
    } else {
      this.grupo.permissoes = this.grupo.permissoes.filter(p => p.id !== perm.id);
    }
  }

  findById(id: number) {
    this.pgService.findById(id).subscribe({
      next: ret => { this.grupo = ret; },
      error: () => {
        Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
      }
    });
  }

  save() {
    if (this.grupo.id) {
      this.pgService.update(this.grupo).subscribe({
        next: () => {
          Swal.fire({ title: 'Registro editado com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
          this.router2.navigate(['admin/permissao']);
        },
        error: () => {
          Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
        }
      });
    } else {
      const grp = { ...this.grupo };
      delete grp.id;
      this.pgService.save(grp).subscribe({
        next: () => {
          Swal.fire({ title: 'Registro cadastrado com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
          this.router2.navigate(['admin/permissao']);
        },
        error: erro => {
          console.error('Erro completo:', erro);
          let mensagem = `Status: ${erro.status} - ${erro.statusText || 'Sem mensagem'}`;
          if (erro.error && typeof erro.error === 'object' && erro.error.mensagem) {
            mensagem = erro.error.mensagem;
          }
          Swal.fire({ title: 'Ocorreu um erro!', text: mensagem, icon: 'error', confirmButtonText: 'Ok' });
        }
      });
    }
  }
}
