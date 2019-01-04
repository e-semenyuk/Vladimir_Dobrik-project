import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DynamicsComponent } from './dynamics/dynamics.component';
import { AboutComponent } from './about/about.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'currency/:id/dynamics', component: DynamicsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'favorite', component: FavoriteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  DynamicsComponent,
  CalculatorComponent,
  FavoriteComponent,
  AboutComponent,
  HomeComponent
]
