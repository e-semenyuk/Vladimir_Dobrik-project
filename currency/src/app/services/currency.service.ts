import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { DateService } from './date.service';
import { Currency } from '../shared/currency';
import { CurrencyDynamics } from '../shared/currency-dynamics';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currencies: Currency[];

  private currenciesRatesUrl = 'http://www.nbrb.by/API/ExRates/Rates';
  private currenciesUrl = 'http://www.nbrb.by/API/ExRates/Currencies';
  private currenciesDynamics = 'http://www.nbrb.by/API/ExRates/Rates/Dynamics';

  public counterFavorites: Subject<number> = new Subject<number>();
  public counter: number = 0;

  public selectedCurrency: Subject<Currency> = new Subject<Currency>();

  constructor(private http: HttpClient,
              private dateService: DateService) {
    this.getCurrencies().subscribe(currencies => this.currencies = currencies);
}

  private handleError<T> (result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  public getCurrencies(date?: Date): Observable<Currency[]> {
    let formattedDate: string;

    if(date) {
        formattedDate = `onDate=${this.dateService.dateToYMD(date)}`;
    } else {
        formattedDate = '';
    }

    const url = `${this.currenciesRatesUrl}?Periodicity=0&ParamMode=1&${formattedDate}`;

    return this.http.get<Currency[]>(url).pipe(
      catchError(this.handleError([]))
    );
  }

  public addToFavorite(id: number): void {
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

  public removeFromFavorite(index: number): void {
    let currenciesLS = JSON.parse(localStorage.getItem('currencies'));

    if(currenciesLS !== null && currenciesLS.favorite) {
      currenciesLS.favorite.splice(index, 1);
      localStorage.setItem('currencies', JSON.stringify(currenciesLS));
    }
  }

  public searchCurrencies(term: string): Currency[] {
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

  public getCurrency(id: number): Observable<Currency> {
    const url = `${this.currenciesUrl}/${id}`;

    return this.http.get<Currency>(url)
      .pipe(
        catchError(this.handleError<Currency>())
      );
  }

  public getDynamics(id: number, startDate: Date, endDate: Date): Observable<CurrencyDynamics[]> {
    let startFormattedDate: string;
    let endFormattedDate: string;

    startFormattedDate = `startDate=${this.dateService.dateToYMD(startDate)}`;
    endFormattedDate = `endDate=${this.dateService.dateToYMD(endDate)}`;

    let url = `${this.currenciesDynamics}/${id}?${startFormattedDate}&${endFormattedDate}`;

    return this.http.get<CurrencyDynamics[]>(url)
      .pipe(
        catchError(this.handleError([]))
      );
  }
}
