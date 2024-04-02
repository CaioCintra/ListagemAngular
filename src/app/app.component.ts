import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PessoaService } from './_services/pessoa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class AppComponent implements OnInit {
  title = 'listagemAngular';
  pessoas: any[] = [];

  constructor(private pessoaService: PessoaService, private router: Router) {}

  // Ao carregar a página faz uma requisição dos dados
  ngOnInit(): void {
    this.pessoaService.getAllPessoas({}).subscribe((response: any) => {
      this.pessoas = response.data;
    });
  }

  criarPessoa(): void {
    this.router.navigate(['/criar']);
  }
}
