import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DynamicsComponent } from './dynamics/dynamics.component';
import { AboutComponent } from './about/about.component';
import { CalculatorComponent } from './calculator/calculator.component';

const routes: Routes = [
  { path: 'currency/:id/dynamics', component: DynamicsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'calculator', component: CalculatorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  DynamicsComponent,
  AboutComponent,
  CalculatorComponent
]
