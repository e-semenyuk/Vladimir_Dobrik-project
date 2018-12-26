import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { ShowplusPipe } from './showplus.pipe';

import { AppComponent } from './app.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrenciesComponent,
    ShowplusPipe,
    NavigationMenuComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
