import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageService } from 'primeng/api';
import { PrimeNG } from 'primeng/config';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Aluno } from '../../../models/aluno';
import { AlunosService } from '../../../services/alunos.service';

@Component({
  selector: 'app-alunosdetails',
  standalone: true,
  imports: [
    CommonModule,
    MdbFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FileUploadModule,
    ToastModule,
    ButtonModule,
    BadgeModule,
    ProgressBarModule
  ],
  templateUrl: './alunosdetails.component.html',
  styleUrl: './alunosdetails.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService]
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
    '',
    undefined
  );
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  alunosService = inject(AlunosService);
  messageService = inject(MessageService);
  config = inject(PrimeNG);

  @ViewChild('fileUploader') fileUploader?: FileUpload;

  files: File[] = [];
  totalSize: number = 0;
  totalSizePercent: number = 0;

  generos = ['Masculino', 'Feminino', 'Não Binário', 'Prefere não informar'];
  parentescos = ['Pai', 'Mãe', 'Responsável Legal', 'Avô/Avó', 'Tio/Tia'];

  get uploadUrl(): string {
    return `http://localhost:8080/alunos/upload/${this.aluno.id}`;
  }

  onTemplatedUpload() {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    this.fileUploader?.clear();
  }

  choose(event: Event, callback: () => void) {
    callback();
  }

  onRemoveTemplatingFile(event: Event, file: File, removeFileCallback: Function, index: number) {
    removeFileCallback(event, index);
    this.totalSize -= parseInt(this.formatSize(file.size));
    this.totalSizePercent = this.totalSize / 10;
  }

  onClearTemplatingUpload(clear: () => void) {
    clear();
    this.totalSize = 0;
    this.totalSizePercent = 0;
  }

  onSelectedFiles(event: any) {
    this.files = event.currentFiles;
    this.files.forEach((file) => {
      this.totalSize += parseInt(this.formatSize(file.size));
    });
    this.totalSizePercent = this.totalSize / 10;
  }

  uploadEvent(callback: () => void) {
    callback();
  }

  formatSize(bytes: number) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes;
    if (bytes === 0) {
      return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
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
