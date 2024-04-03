import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PessoaService } from '../../_services/pessoa.service';

@Component({
  selector: 'app-excluir-pessoa',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './excluir-pessoa.component.html',
  styleUrl: './excluir-pessoa.component.css',
})
export class ExcluirPessoaComponent {
  @Input() pessoaParaEditar: any;

  constructor(private pessoaService: PessoaService) {}

  openModal() {
    console.log('excluir_' + this.pessoaParaEditar.pessoaId);
    const modalDiv = document.getElementById(
      'excluir_' + this.pessoaParaEditar.pessoaId
    );
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }

  closeModal() {
    const modalDiv = document.getElementById(
      'excluir_' + this.pessoaParaEditar.pessoaId
    );
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
  }

  excluirPessoa(id: number) {
    this.pessoaService.apagarPessoa(id).subscribe(
      (response) => {
        console.log('Pessoa exluida com sucesso:', response);
        this.closeModal()
        window.location.href = "/";
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
