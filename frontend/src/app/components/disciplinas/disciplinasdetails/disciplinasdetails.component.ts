import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { Disciplina } from '../../../models/disciplina';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DisciplinaService } from '../../../services/disciplina.service';

@Component({
  selector: 'app-disciplinasdetails',
  standalone: true,
  imports: [MdbFormsModule, MdbRippleModule, FormsModule],
  templateUrl: './disciplinasdetails.component.html',
  styleUrl: './disciplinasdetails.component.css'
})
export class DisciplinasdetailsComponent {

  disciplina: Disciplina = new Disciplina('', '');
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  disciplinaService = inject(DisciplinaService);

  constructor(){
    const id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }
  }

  findById(id: number){
    this.disciplinaService.findById(id).subscribe({
      next: ret => { this.disciplina = ret; },
      error: () => {
        Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
      }
    });
  }

  save(){
    if(this.disciplina.id){
      this.disciplinaService.update(this.disciplina).subscribe({
        next: () => {
          Swal.fire({ title: 'Disciplina editada com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
          this.router2.navigate(['admin/disciplinas']);
        },
        error: () => {
          Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
        }
      });
    } else {
      const discParaSalvar = {...this.disciplina};
      delete discParaSalvar.id;
      this.disciplinaService.save(discParaSalvar).subscribe({
        next: () => {
          Swal.fire({ title: 'Disciplina cadastrada com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
          this.router2.navigate(['admin/disciplinas']);
        },
        error: erro => {
          console.error('Erro completo:', erro);
          Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
        }
      });
    }
  }
}
