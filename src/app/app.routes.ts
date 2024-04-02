import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CriarPessoaComponent } from './_pages/criar-pessoa/criar-pessoa.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'criar', component: CriarPessoaComponent },
  //   { path: '**', component: NotFoundComponent } // Rota para lidar com URLs desconhecidas
];
