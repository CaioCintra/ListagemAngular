import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PessoaService } from '../../_services/pessoa.service';
import { EnderecoService } from '../../_services/endereco.service';
import { MatIconModule } from '@angular/material/icon';

let codEndereco = 0;
@Component({
  standalone: true,
  selector: 'app-criar-pessoa',
  templateUrl: './criar-pessoa.component.html',
  styleUrls: ['./criar-pessoa.component.css'],
  imports: [CommonModule, MatIconModule],
})
export class CriarPessoaComponent {
  constructor(
    private pessoaService: PessoaService,
    private enderecoService: EnderecoService
  ) {}
  pessoaData: any = [];
  endereco: any[] = [];

  openModal() {
    const modalDiv = document.getElementById('createModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }

  closeModal() {
    const modalDiv = document.getElementById('createModal');
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

  cadastrarPessoa() {
    // Capturar os dados da pessoa do formulário
    const nomeInput = document.getElementById('name') as HTMLInputElement;
    const dataNascimentoInput = document.getElementById(
      'date'
    ) as HTMLInputElement;
    const idadeInput = document.getElementById('age') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const telefoneInput = document.getElementById('phone') as HTMLInputElement;
    const celularInput = document.getElementById('cel') as HTMLInputElement;

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
      alert(
        'Erro: Você deve adicionar pelo menos um endereço'
      );
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

    console.log('Dados da pessoa:', this.pessoaData);
    // Chamar o service para salvar a pessoa
    this.pessoaService.salvarPessoa(this.pessoaData).subscribe(
      (response) => {
        // Extrair o id da pessoa do response
        const pessoaId = response.data;
        console.log(pessoaId);
        // Salvar os endereços
        this.salvarEnderecos(pessoaId);
        alert('Pessoa cadastrada com sucesso!');
        window.location.href = "/";

      },
      (error) => {
        alert('Erro ao cadastrar pessoa: ' + error.error.errors[0]);
      }
    );
  }

  limparFormulario() {
    // Limpar os campos do formulário
    const nomeInput = document.getElementById('name') as HTMLInputElement;
    const dataNascimentoInput = document.getElementById(
      'date'
    ) as HTMLInputElement;
    const idadeInput = document.getElementById('age') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const telefoneInput = document.getElementById('phone') as HTMLInputElement;
    const celularInput = document.getElementById('cel') as HTMLInputElement;

    nomeInput.value = '';
    dataNascimentoInput.value = '';
    idadeInput.value = '';
    emailInput.value = '';
    telefoneInput.value = '';
    celularInput.value = '';

    // Limpar os campos de endereço também
    const streetInput = document.getElementById('street') as HTMLInputElement;
    const neighborhoodInput = document.getElementById(
      'neighborhood'
    ) as HTMLInputElement;
    const ufSelect = document.getElementById('uf') as HTMLSelectElement;
    const numberInput = document.getElementById('number') as HTMLInputElement;
    const cityInput = document.getElementById('city') as HTMLInputElement;

    streetInput.value = '';
    neighborhoodInput.value = '';
    ufSelect.selectedIndex = 0;
    numberInput.value = '';
    cityInput.value = '';

    // Limpar os arrays de dados
    this.pessoaData = {};
    this.endereco = [];
  }

  validarEndereco(endereco: any[]): boolean {
    // Verificar se há pelo menos um endereço
    return endereco.length > 0;
  }

  salvarEnderecos(pessoaId: number) {
    // Para cada endereço, adicionar o campo pessoaId e salvar
    this.endereco.forEach((endereco) => {
      // Remover o campo 'cod'
      delete endereco.cod;
      
      // Adicionar o campo 'pessoaId'
      endereco.pessoaId = pessoaId;
  
      // Chamar o serviço para salvar o endereço
      this.enderecoService.salvarEndereco(endereco).subscribe(
        (response) => {
          console.log('Endereço salvo com sucesso:', response);
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }
  

  addEndereco() {
    // Adicionar endereço como objeto na variável
    const streetInput = document.getElementById('street') as HTMLInputElement;
    const neighborhoodInput = document.getElementById(
      'neighborhood'
    ) as HTMLInputElement;
    const ufSelect = document.getElementById('uf') as HTMLSelectElement;
    const numberInput = document.getElementById('number') as HTMLInputElement;
    const cityInput = document.getElementById('city') as HTMLInputElement;

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

  removeEnd(cod: number) {
    this.endereco = this.endereco.filter((endereco) => endereco.cod !== cod);
  }
}
