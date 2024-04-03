import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PessoaService } from '../../_services/pessoa.service';
import { EnderecoService } from '../../_services/endereco.service';

let codEndereco = 0;

@Component({
  selector: 'app-editar-pessoa',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './editar-pessoa.component.html',
  styleUrl: './editar-pessoa.component.css',
})
export class EditarPessoaComponent {
  @Input() pessoaParaEditar: any;
  constructor(
    private pessoaService: PessoaService,
    private enderecoService: EnderecoService
  ) {}
  pessoaData: any = [];
  endereco: any[] = [];

  openModal() {
    console.log(this.pessoaParaEditar);
    this.enderecoService
      .consultarEnderecosPorPessoaId(this.pessoaParaEditar.pessoaId)
      .subscribe(
        (enderecos: any) => {
          // Verificando se existem dados antes de iterar
          if (enderecos.data && Array.isArray(enderecos.data)) {
            // Iterando sobre os dados e adicionando ao array this.endereco
            enderecos.data.forEach((enderecoItem: any) => {
              this.endereco.push(enderecoItem);
            });
            console.log('Endereços recebidos:', this.endereco);
          } else {
            console.log('Nenhum endereço encontrado.');
          }
        },
        (error) => {
          console.error('Erro ao consultar endereços:', error);
        }
      );
    const modalDiv = document.getElementById(this.pessoaParaEditar.pessoaId);
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }

  closeModal() {
    const modalDiv = document.getElementById(this.pessoaParaEditar.pessoaId);
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
      this.limparFormulario();
    }
  }

  validarDadosPessoa(pessoaData: any): boolean {
    if (
      !pessoaData.nome ||
      !pessoaData.dataNascimento ||
      !pessoaData.idade ||
      !pessoaData.email ||
      !pessoaData.telefone ||
      !pessoaData.celular
    ) {
      return false;
    }
    return true;
  }

  editarPessoa() {
    // Capturar os dados da pessoa do formulário
    const nomeInput = document.getElementById(
      'name_' + this.pessoaParaEditar.pessoaId
    ) as HTMLInputElement;
    const dataNascimentoInput = document.getElementById(
      'date_' + this.pessoaParaEditar.pessoaId
    ) as HTMLInputElement;
    const idadeInput = document.getElementById(
      'age_' + this.pessoaParaEditar.pessoaId
    ) as HTMLInputElement;
    const emailInput = document.getElementById(
      'email_' + this.pessoaParaEditar.pessoaId
    ) as HTMLInputElement;
    const telefoneInput = document.getElementById(
      'phone_' + this.pessoaParaEditar.pessoaId
    ) as HTMLInputElement;
    const celularInput = document.getElementById(
      'cel_' + this.pessoaParaEditar.pessoaId
    ) as HTMLInputElement;

    // Validar se os campos estão preenchidos
    if (
      nomeInput.value.trim() === '' ||
      dataNascimentoInput.value.trim() === '' ||
      idadeInput.value.trim() === '' ||
      emailInput.value.trim() === '' ||
      telefoneInput.value.trim() === '' ||
      celularInput.value.trim() === ''
    ) {
      alert('Erro: Preencha todos os campos da pessoa.');
      return;
    }

    // Converter a idade para um número inteiro
    const idade = parseInt(idadeInput.value, 10);

    // Verificar se a idade é um número válido
    if (isNaN(idade)) {
      alert('Erro: A idade deve ser um número válido.');
      return;
    }

    const dataNascimentoISO = new Date(dataNascimentoInput.value).toISOString();

    if (this.endereco.length === 0) {
      alert('Erro: Você deve adicionar pelo menos um endereço');
      return;
    }

    // Armazenar os dados da pessoa no objeto pessoaData
    this.pessoaData = {
      nome: nomeInput.value,
      dataNascimento: dataNascimentoISO,
      idade: idade,
      email: emailInput.value,
      telefone: telefoneInput.value,
      celular: celularInput.value,
    };

    // Chamar o service para salvar a pessoa
    this.pessoaService
      .alterarPessoa(this.pessoaParaEditar.pessoaId, this.pessoaData)
      .subscribe(
        (response) => {
          // Extrair o id da pessoa do response
          const pessoaId = response.data;
          // Salvar os endereços
          this.salvarEnderecos(this.pessoaParaEditar.pessoaId);
          alert('Pessoa atualizada com sucesso!');
          window.location.href = "/";

        },
        (error) => {
          alert('Erro ao cadastrar pessoa: ' + error.error.errors[0]);
        }
      );
  }

  limparFormulario() {
    // Limpar os campos de endereço
    const streetInput = document.getElementById(
      'street_' + this.pessoaParaEditar.pessoaId
    ) as HTMLInputElement;
    const neighborhoodInput = document.getElementById(
      'neighborhood_' + this.pessoaParaEditar.pessoaId
    ) as HTMLInputElement;
    const ufSelect = document.getElementById(
      'uf_' + this.pessoaParaEditar.pessoaId
    ) as HTMLSelectElement;
    const numberInput = document.getElementById(
      'number_' + this.pessoaParaEditar.pessoaId
    ) as HTMLInputElement;
    const cityInput = document.getElementById(
      'city_' + this.pessoaParaEditar.pessoaId
    ) as HTMLInputElement;

    streetInput.value = '';
    neighborhoodInput.value = '';
    ufSelect.selectedIndex = 0;
    numberInput.value = '';
    cityInput.value = '';

    this.endereco = [];
  }

  validarEndereco(endereco: any[]): boolean {
    // Verificar se há pelo menos um endereço
    return endereco.length > 0;
  }

  salvarEnderecos(pessoaId: number) {
    // Para cada endereço, adicionar o campo pessoaId e salvar
    this.endereco.forEach((endereco) => {
      delete endereco.cod;
      // Verificar se o endereço já possui um ID, os anteriormente cadastrados possuem este id
      if (!endereco.enderecoId) {
        // Se não tiver um ID de endereço, atribuir o ID da pessoa
        endereco.pessoaId = pessoaId;
        // Chamar o serviço para salvar o endereço apenas se não tiver um ID
        this.enderecoService.salvarEndereco(endereco).subscribe(
          (response) => {
            console.log('Endereço salvo com sucesso:', response);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  addEndereco() {
    // Adicionar endereço como objeto na variável
    const streetInput = document.getElementById(
      'street_' + this.pessoaParaEditar.pessoaId
    ) as HTMLInputElement;
    const neighborhoodInput = document.getElementById(
      'neighborhood_' + this.pessoaParaEditar.pessoaId
    ) as HTMLInputElement;
    const ufSelect = document.getElementById(
      'uf_' + this.pessoaParaEditar.pessoaId
    ) as HTMLSelectElement;
    const numberInput = document.getElementById(
      'number_' + this.pessoaParaEditar.pessoaId
    ) as HTMLInputElement;
    const cityInput = document.getElementById(
      'city_' + this.pessoaParaEditar.pessoaId
    ) as HTMLInputElement;

    if (
      streetInput.value.trim() === '' ||
      neighborhoodInput.value.trim() === '' ||
      ufSelect.value === 'Selecione o estado' ||
      numberInput.value.trim() === '' ||
      cityInput.value.trim() === ''
    ) {
      alert('Por favor, preencha todos os campos de endereço.');
      return;
    }

    const enderecoObj = {
      cod: codEndereco,
      logradouro: streetInput.value,
      numero: numberInput.value,
      bairro: neighborhoodInput.value,
      cidade: cityInput.value,
      uf: ufSelect.value,
    };
    this.endereco.push(enderecoObj);
    codEndereco = codEndereco + 1;
  }

  removeEnd(end: any) {
    if (end.enderecoId) {
      this.enderecoService.apagarEndereco(end.enderecoId).subscribe(
        (response) => {
          console.log('Endereço excluido com sucesso:', response);
        },
        (error) => {
          console.error(error);
        }
      );
      this.endereco = this.endereco.filter(
        (endereco) => endereco.enderecoId !== end.enderecoId
      );
    } else {
      this.endereco = this.endereco.filter(
        (endereco) => endereco.cod !== end.cod
      );
    }
  }
}
