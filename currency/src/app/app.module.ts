import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material';

import { AppRoutingModule } from './app-routing.module';

import { ShowplusPipe } from './showplus.pipe';

import { AppComponent } from './app.component';
import { routingComponents } from './app-routing.module';
import { CurrenciesComponent } from './currencies/currencies.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { SearchComponent } from './search/search.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    CurrenciesComponent,
    ShowplusPipe,
    NavigationMenuComponent,
    SearchComponent,
    LoadingSpinnerComponent,
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
