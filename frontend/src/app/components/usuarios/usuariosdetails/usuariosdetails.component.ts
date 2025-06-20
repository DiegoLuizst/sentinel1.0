import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/usuario';
import { PermissaoGrupo } from '../../../models/permissao-grupo';
import { UsuariosService } from '../../../services/usuarios.service';
import { PermissaoGrupoService } from '../../../services/permissao-grupo.service';

@Component({
  selector: 'app-usuariosdetails',
  standalone: true,
  imports: [CommonModule, MdbFormsModule, FormsModule],
  templateUrl: './usuariosdetails.component.html',
  styleUrl: './usuariosdetails.component.css'
})
export class UsuariosdetailsComponent implements OnInit {

  usuario: Usuario = new Usuario('', '', '', null);
  grupos: PermissaoGrupo[] = [];
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  usuariosService = inject(UsuariosService);
  grupoService = inject(PermissaoGrupoService);

  constructor() {
    const id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  ngOnInit(): void {
    this.loadGrupos();
  }

  loadGrupos() {
    this.grupoService.findAll().subscribe({
      next: lista => { this.grupos = lista; },
      error: () => {
        Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
      }
    });
  }

  findById(id: number) {
    this.usuariosService.findById(id).subscribe({
      next: retorno => { this.usuario = retorno; },
      error: () => {
        Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
      }
    });
  }

  save() {
    if (this.usuario.id) {
      this.usuariosService.update(this.usuario).subscribe({
        next: () => {
          Swal.fire({ title: 'Usuário editado com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
          this.router2.navigate(['admin/usuarios']);
        },
        error: () => {
          Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
        }
      });
    } else {
      const usuarioParaSalvar = { ...this.usuario };
      delete usuarioParaSalvar.id;
      this.usuariosService.save(usuarioParaSalvar).subscribe({
        next: () => {
          Swal.fire({ title: 'Usuário cadastrado com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
          this.router2.navigate(['admin/usuarios']);
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
