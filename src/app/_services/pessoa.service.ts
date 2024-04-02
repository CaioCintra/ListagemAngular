import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private baseUrl = 'https://www.selida.com.br/avaliacaotecnica/api/Pessoas';
  private chave: string;

  constructor(private http: HttpClient) {
    // require('dotenv').config();
    // this.chave = process.env['CHAVE'] ?? '';
    this.chave = "4CFA09F3-D2E7-4386-9812-A5A285621A7F"
  }

  getPessoaById(pessoaId: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/${pessoaId}`,
      this.getRequestOptions()
    );
  }

  alterarPessoa(pessoaId: number, pessoaData: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${pessoaId}`,
      pessoaData,
      this.getRequestOptions()
    );
  }

  apagarPessoa(pessoaId: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/${pessoaId}`,
      this.getRequestOptions()
    );
  }

  salvarPessoa(pessoaData: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}`,
      pessoaData,
      this.getRequestOptions()
    );
  }

  getAllPessoas(params: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetAll`, {
      params,
      ...this.getRequestOptions(),
    });
  }

  // Passa a chave de acesso pelo header de cada uma das funções
  private getRequestOptions() {
    const headers = new HttpHeaders().set('Chave', this.chave);
    return { headers: headers };
  }
}
