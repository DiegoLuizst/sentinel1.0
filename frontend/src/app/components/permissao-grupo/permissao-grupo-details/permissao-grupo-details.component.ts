import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PermissaoGrupo } from '../../../models/permissao-grupo';
import { PermissaoGrupoService } from '../../../services/permissao-grupo.service';

@Component({
  selector: 'app-permissao-grupo-details',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './permissao-grupo-details.component.html',
  styleUrl: './permissao-grupo-details.component.css'
})
export class PermissaoGrupoDetailsComponent {

  grupo: PermissaoGrupo = new PermissaoGrupo('');
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  pgService = inject(PermissaoGrupoService);

  constructor() {
    const id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
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
