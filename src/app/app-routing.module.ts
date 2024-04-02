import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CriarPessoaComponent } from './_pages/criar-pessoa/criar-pessoa.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'criar', component: CriarPessoaComponent },
//   { path: '**', component: NotFoundComponent } // Rota para lidar com URLs desconhecidas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
