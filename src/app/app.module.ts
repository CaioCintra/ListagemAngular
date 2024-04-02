import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { CriarPessoaComponent } from './_pages/criar-pessoa/criar-pessoa.component';

@NgModule({
  declarations: [AppComponent, CriarPessoaComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    MatDialogModule,
    CriarPessoaComponent
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent, CriarPessoaComponent]
})
export class AppModule {}
