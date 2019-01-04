import { Injectable } from '@angular/core';
import { Currency } from './currency';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { DateService } from './date.service';
import { CurrencyDynamics } from './currency-dynamics';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  public currencies: Currency[];
  private currenciesRatesUrl = 'http://www.nbrb.by/API/ExRates/Rates';
  private currenciesUrl = 'http://www.nbrb.by/API/ExRates/Currencies';
  private currenciesDynamics = 'http://www.nbrb.by/API/ExRates/Rates/Dynamics';

  public counterFavorites: Subject<number> = new Subject<number>();
  public counter: number = 0;

  constructor(private http: HttpClient,
              public dateService: DateService) {
    this.getCurrencies().subscribe(currencies => this.currencies = currencies);
}

  private handleError<T> (result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getCurrencies(date?: Date): Observable<Currency[]> {
    let formattedDate: string;

    if(date) {
        formattedDate = `onDate=${this.dateService.dateToYMD(date)}`;
    } else {
        formattedDate = '';
    }

    const url = `${this.currenciesRatesUrl}?Periodicity=0&ParamMode=1&${formattedDate}`;

    return this.http.get<Currency[]>(url).pipe(
      tap(_ => console.log('getCurrencies fetched currencies')),
      catchError(this.handleError([]))
    );
  }

  addToFavorite(id: number): void {
    let currenciesLS = JSON.parse(localStorage.getItem('currencies'));

    if(currenciesLS !== null && currenciesLS.favorite) {

      let isInclude = currenciesLS.favorite.find(item => item.id === id);

      if(!isInclude) {
        currenciesLS.favorite.push({"id": id});
        localStorage.setItem('currencies', JSON.stringify(currenciesLS));
      }
    } else {
      localStorage.setItem('currencies', JSON.stringify({favorite: [{id}]}));
    }
    this.counter++;
    this.counterFavorites.next(this.counter);
  }

  removeFromFavorite(index: number): void {
    let currenciesLS = JSON.parse(localStorage.getItem('currencies'));

    if(currenciesLS !== null && currenciesLS.favorite) {
      currenciesLS.favorite.splice(index, 1);
      localStorage.setItem('currencies', JSON.stringify(currenciesLS));
    }
  }

  searchCurrencies(term: string) {
    let searchResult: Currency[] = [];

    if (term.trim() === '') {
      searchResult = [];
    }

    this.currencies.forEach(item => {
      if (term.trim().length) {
        let isIncludesTerm = item.Cur_Abbreviation.includes(term.toUpperCase());

        if (isIncludesTerm) {
          let isIncludesCur = searchResult.includes(item);

          if(!isIncludesCur){
            searchResult.push(item);
          }
        }
      }

      searchResult.forEach((item, index, arr) => {
        let isIncludesTerm = item.Cur_Abbreviation.includes(term.toUpperCase());

        if(!isIncludesTerm) {
          arr.splice(index, 1);
        }
      });
    });

    return searchResult;
  }

  getCurrency(id: number): Observable<Currency> {
    const url = `${this.currenciesUrl}/${id}`;

    return this.http.get<Currency>(url)
      .pipe(
        tap(_ => console.log(`fetched currency id = ${id}`)),
        catchError(this.handleError<Currency>())
      );
  }

  getDynamics(id: number, startDate: Date, endDate: Date): Observable<CurrencyDynamics[]> {
    let startFormattedDate: string;
    let endFormattedDate: string;

    startFormattedDate = `startDate=${this.dateService.dateToYMD(startDate)}`;
    endFormattedDate = `endDate=${this.dateService.dateToYMD(endDate)}`;

    let url = `${this.currenciesDynamics}/${id}?${startFormattedDate}&${endFormattedDate}`;

    return this.http.get<CurrencyDynamics[]>(url)
      .pipe(
        tap(_ => console.log(`getDynamics fetched rates of currency id =${id}`)),
        catchError(this.handleError([]))
      );
  }
}
