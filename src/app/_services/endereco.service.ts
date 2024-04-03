import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment";

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  private baseUrl = 'https://www.selida.com.br/avaliacaotecnica/api/Endereco';
  private chave: any;

  constructor(private http: HttpClient) {
    this.chave = environment.CHAVE;
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
