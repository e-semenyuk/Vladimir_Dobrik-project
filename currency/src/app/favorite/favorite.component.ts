import { Component, OnInit } from '@angular/core';
import { Currency } from '../shared/currency';
import { CurrencyService } from '../services/currency.service';

interface IFavoriteCurrency {
  id: number;
}

@Component({
  selector: 'currency-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  currencies: Currency[];
  favoriteCurrencies: IFavoriteCurrency[];

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.renderFavorites();
  }

  getCurrencies(date?: Date): void {
    this.currencyService.getCurrencies(date).subscribe(
      currencies => {
        let filteredCurrencies = currencies.filter(
          item => this.favoriteCurrencies.find(elem => elem.id == item.Cur_ID)
        );

        return this.currencies = filteredCurrencies;
      }
    )
  }

  renderFavorites(): void {
    let currenciesLS = JSON.parse(localStorage.getItem('currencies'));

    if(currenciesLS !== null && currenciesLS.favorite) {
      this.favoriteCurrencies = currenciesLS.favorite;
      this.getCurrencies();
    }
  }

  remove(index: number): void {
    this.currencyService.removeFromFavorite(index);
    this.renderFavorites();
  }
}
