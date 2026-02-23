import { Routes } from '@angular/router';
import { Register } from './register/register';
import { Rehistro } from './rehistro/rehistro';

export const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: Register },
  { path: 'rehistro', component: Rehistro },
  { path: '**', redirectTo: '/register' }
];
