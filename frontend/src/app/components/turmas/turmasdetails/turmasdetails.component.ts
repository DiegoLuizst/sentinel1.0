import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Turma } from '../../../models/turmas';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { TurmasService } from '../../../services/turmas.service';

@Component({
  selector: 'app-turmasdetails',
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './turmasdetails.component.html',
  styleUrl: './turmasdetails.component.css'
})
export class TurmasdetailsComponent {

  turma: Turma = new Turma('', '', '', '', '');
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  turmaService = inject(TurmasService);

  constructor(){
    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }

  }
    findById(id: number){

      this.turmaService.findById(id).subscribe({
        next: retorno => {

          this.turma = retorno;

        },
        error: erro =>{
          Swal.fire({
            title: "Ocorreu um erro!",

            icon: 'error',
            confirmButtonText: 'Ok'
          });

        }
      });

    }




  save(){
    if(this.turma.id) {

      this.turmaService.update(this.turma).subscribe({
        next: mensagem => {
          Swal.fire({
            title: "Turma editada com sucesso!",

            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(['admin/turmas'], {state: { turmaEditada: this.turma }});

        },
        error: erro =>{
          Swal.fire({
            title: "Ocorreu um erro!",

            icon: 'error',
            confirmButtonText: 'Ok'
          });

        }
      });



    } else {
    const turmaParaSalvar = {...this.turma};
    delete turmaParaSalvar.id;
    this.turmaService.save(turmaParaSalvar).subscribe({
      next: mensagem => {
        Swal.fire({
          title: "Turma cadastrada com sucesso!",
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.router2.navigate(['admin/turmas'], {state: { turmaNova: this.turma }});
      },
      error: erro => {
        console.error('Erro completo:', erro);
        Swal.fire({
          title: "Ocorreu um erro!",
          text: `Status: ${erro.status} - ${erro.statusText || 'Sem mensagem'}`,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }
  }
}
