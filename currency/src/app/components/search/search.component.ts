import { Component } from '@angular/core';

import { Currency } from '../../shared/currency';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'currency-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  public searchResult: Currency[];

  constructor(private currencyService: CurrencyService) {}

  public search(term: string): void {
    this.searchResult = this.currencyService.searchCurrencies(term);
  }

  public select(input: HTMLInputElement, currency: Currency): void {
    this.searchResult = [];
    input.value = '';
    this.currencyService.selectedCurrency.next(currency);
  }
}