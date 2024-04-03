import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  private baseUrl = 'https://www.selida.com.br/avaliacaotecnica/api/Endereco';
  private chave: string;

  constructor(private http: HttpClient) {
    this.chave = "4CFA09F3-D2E7-4386-9812-A5A285621A7F";
  }

  consultarEnderecoPorId(enderecoId: number) {
    return this.http.get(`${this.baseUrl}/${enderecoId}`, this.getRequestOptions());
  }

  alterarEndereco(enderecoId: number, dadosEndereco: any) {
    return this.http.put(`${this.baseUrl}/${enderecoId}`, dadosEndereco, this.getRequestOptions());
  }

  apagarEndereco(enderecoId: number) {
    return this.http.delete(`${this.baseUrl}/${enderecoId}`, this.getRequestOptions());
  }

  salvarEndereco(dadosEndereco: any) {
    return this.http.post(`${this.baseUrl}`, dadosEndereco, this.getRequestOptions());
  }

  consultarEnderecosPorPessoaId(pessoaId: number) {
    return this.http.get(`${this.baseUrl}/GetAll/${pessoaId}`, this.getRequestOptions());
  }

  private getRequestOptions() {
    const headers = new HttpHeaders().set('Chave', this.chave);
    return { headers: headers };
  }
}
