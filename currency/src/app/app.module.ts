import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material';

import { AppRoutingModule } from './app-routing.module';

import { ShowplusPipe } from './pipes/showplus.pipe';

import { AppComponent } from './root-component/app.component';
import { routingComponents } from './app-routing.module';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { SearchComponent } from './components/search/search.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ChartComponent } from './components/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    CurrenciesComponent,
    ShowplusPipe,
    NavigationMenuComponent,
    SearchComponent,
    LoadingSpinnerComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
