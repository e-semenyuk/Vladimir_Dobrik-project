import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DynamicsComponent } from './dynamics/dynamics.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'currency/:id/dynamics', component: DynamicsComponent },
  { path: 'dynamics', component: DynamicsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
