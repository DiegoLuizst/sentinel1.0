import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { Cargo } from '../../../models/cargo';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CargoService } from '../../../services/cargo.service';

@Component({
  selector: 'app-cargosdetails',
  standalone: true,
  imports: [MdbFormsModule, MdbRippleModule, FormsModule],
  templateUrl: './cargosdetails.component.html',
  styleUrl: './cargosdetails.component.css'
})
export class CargosdetailsComponent {

  cargo: Cargo = new Cargo('');
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  cargoService = inject(CargoService);

  constructor(){
    const id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }
  }

  findById(id: number){
    this.cargoService.findById(id).subscribe({
      next: ret => { this.cargo = ret; },
      error: () => {
        Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
      }
    });
  }

  save(){
    if(this.cargo.id){
      this.cargoService.update(this.cargo).subscribe({
        next: () => {
          Swal.fire({ title: 'Cargo editado com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
          this.router2.navigate(['admin/cargos']);
        },
        error: () => {
          Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
        }
      });
    } else {
      const cargoParaSalvar = {...this.cargo};
      delete cargoParaSalvar.id;
      this.cargoService.save(cargoParaSalvar).subscribe({
        next: () => {
          Swal.fire({ title: 'Cargo cadastrado com sucesso!', icon: 'success', confirmButtonText: 'Ok' });
          this.router2.navigate(['admin/cargos']);
        },
        error: erro => {
          console.error('Erro completo:', erro);
          Swal.fire({ title: 'Ocorreu um erro!', icon: 'error', confirmButtonText: 'Ok' });
        }
      });
    }
  }
}
