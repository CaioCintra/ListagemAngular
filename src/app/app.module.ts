import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { CriarPessoaComponent } from './_pages/criar-pessoa/criar-pessoa.component';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
    MatDialogModule,
    CriarPessoaComponent,
  ],
  providers: [HttpClientModule],
  bootstrap: [],
})
export class AppModule {}
