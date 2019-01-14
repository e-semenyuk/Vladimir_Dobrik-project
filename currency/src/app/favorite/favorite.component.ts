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

  public currencies: Currency[];
  public favoriteCurrencies: IFavoriteCurrency[];

  constructor(private currencyService: CurrencyService) { }

  public getCurrencies(date?: Date): void {
    this.currencyService.getCurrencies(date).subscribe(
      currencies => {
        let filteredCurrencies = currencies.filter(
          item => this.favoriteCurrencies.find(elem => elem.id == item.Cur_ID)
        );

        return this.currencies = filteredCurrencies;
      }
    )
  }

  public renderFavorites(): void {
    let currenciesLS = JSON.parse(localStorage.getItem('currencies'));

    if(currenciesLS !== null && currenciesLS.favorite) {
      this.favoriteCurrencies = currenciesLS.favorite;
      this.getCurrencies();
    }
  }

  public remove(index: number): void {
    this.currencyService.removeFromFavorite(index);
    this.renderFavorites();
  }

  ngOnInit() {
    this.renderFavorites();
  }
}
